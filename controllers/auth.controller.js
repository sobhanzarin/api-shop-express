const { sendOtpService, checkOtpService } = require("../services/auth.service");
const cookie = require("cookie-parser");
const NodeEnv = require("../utils/constanst/env.enum");

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
      .status(200)
      .json({
        error: null,
        data: result.accessToken,
      });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  sendOtpHandler,
  checkOtpHandler,
};
