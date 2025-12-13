const createHttpError = require("http-errors");
const {
  sendOtpService,
  checkOtpService,
  verifyRefreshTokenService,
} = require("../services/auth.service");
const NodeEnv = require("../utils/constants/env.enum");
const {
  verifyRefreshToken,
  generateAccessToken,
} = require("../utils/jwt.token");

async function sendOtpHandler(req, res, next) {
  try {
    const { mobile } = req.body;
    const result = await sendOtpService(mobile);
    return res.status(201).json({
      error: null,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
async function checkOtpHandler(req, res, next) {
  try {
    const { mobile, code } = req.body;
    const result = await checkOtpService(mobile, code);
    const { refreshToken } = result;
    res
      .cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        secure: process.env.NODE_ENV == NodeEnv.production,
        httpOnly: true,
      })
      .header("Authorization", accessToken)
      .status(200)
      .json({
        error: null,
        data: result.accessToken,
      });
  } catch (error) {
    next(error);
  }
}
async function verifyRefreshTokenHandler(req, res, next) {
  try {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) throw createHttpError(401, "لطفا ابتدا لاگین کنید.");
    const result = await verifyRefreshTokenService(refreshToken);
    res.status(200).json({
      error: null,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  sendOtpHandler,
  checkOtpHandler,
  verifyRefreshTokenHandler,
};
