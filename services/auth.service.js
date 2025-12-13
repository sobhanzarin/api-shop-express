const createHttpError = require("http-errors");
const OtpCode = require("../models/otp_user.model");
const User = require("../models/user.model");
const { randomInt } = require("crypto");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt.token");
const { where } = require("@sequelize/core");

async function sendOtpService(mobile) {
  const codeOtp = randomInt(10000, 99999);
  const expiresOtp = new Date(Date.now() + 1000 * 60 * 2);
  const user = await User.findOne({ where: { mobile } });
  if (!user) {
    const newUser = await User.create({
      mobile,
    });
    await OtpCode.create({
      userId: newUser.id,
      otp: codeOtp,
      expires_otp: expiresOtp,
    });
  } else {
    const userByOtp = await OtpCode.findOne({ where: { userId: user.id } });
    if (!userByOtp) {
      await OtpCode.create({
        userId: user.id,
        otp: codeOtp,
        expires_otp: expiresOtp,
      });
    } else {
      userByOtp.otp = codeOtp;
      userByOtp.expires_otp = expiresOtp;
      await userByOtp.save();
    }
  }
  return {
    message: "کد ارسال شد.",
    codeOtp,
  };
}
async function checkOtpService(mobile, code) {
  const nowDate = new Date();
  const user = await User.findOne({
    where: { mobile },
    include: [{ model: OtpCode, as: "otp" }],
  });
  if (!user)
    throw createHttpError(
      401,
      "کاربری با این شماره وجود ندارد، لطفا ثبت‌نام کنید."
    );
  if (user.ban_until && user.ban_until > nowDate) {
    throw createHttpError(
      401,
      "اکانت شما غیرفعال شده است، دقایقی دیگر امتحان کنید"
    );
  }

  if (user.ban_until && user.ban_until <= nowDate) {
    user.ban_until = null;
    user.wrong_count = 0;
    await user.save();
  }

  if (user?.otp?.expires_otp < nowDate) {
    user.wrong_count += 1;
    await user.save();
    throw createHttpError(401, "کد شما منقضی شده.");
  }

  if (user?.otp?.otp !== code) {
    user.wrong_count += 1;
    await user.save();
    throw createHttpError(401, "کد وارد شده درست مطابقت ندارد");
  }
  user.ban_until = null;
  user.wrong_count = 0;
  await user.save();
  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken({ userId: user.id });
  return {
    message: "ورود با موفقیت.",
    accessToken,
    refreshToken,
  };
}
async function verifyRefreshTokenService(token) {
  const verified = verifyRefreshToken(token);
  if (!verified || !verified?.userId) {
    throw createHttpError(401, "توکن نامعتبر است.");
  }

  const user = await User.findByPk(verified?.userId);
  if (!user) throw createHttpError(401, "لطفا ابتدا لاگین کنید.");

  const stored = await refreshToken.findOne({ where: { token } });

  // اگر توکنی که فرستاده پیدا نشد → یعنی منقضی شده یا قبلاً استفاده شده
  if (!stored) throw createHttpError(401, "توکن منقضی شده است.");

  // حذف توکن قدیمی
  await refreshToken.destroy({ where: { token } });

  // ساخت توکن جدید
  const newAccessToken = generateAccessToken({ userId: user.id });
  const newRefreshToken = generateRefreshToken({ userId: user.id });

  // ذخیره توکن رفرش جدید
  await refreshToken.create({
    userId: user.id,
    token: newRefreshToken,
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

module.exports = {
  sendOtpService,
  checkOtpService,
  verifyRefreshTokenService,
};
