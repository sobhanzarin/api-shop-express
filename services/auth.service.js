const OtpCode = require("../models/otp_user.model");
const User = require("../models/user.model");
const { randomInt } = require("crypto");

async function sendOtpService(mobile) {
  const codeOtp = randomInt(10000, 99999);
  const expiresOtp = new Date(Date.now() + 1000 * 60 * 2);
  const user = await User.findOne({ where: mobile });
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
    userByOtp.otp = codeOtp;
    userByOtp.expires_otp = expiresOtp;
    await userByOtp.save();
  }
  return {
    message: "کد ارسال شد.",
    codeOtp,
  };
}
async function checkOtpService(mobile, code) {}

module.exports = {
  sendOtpService,
  checkOtpService,
};
