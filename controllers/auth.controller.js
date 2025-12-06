const { sendOtpService } = require("../services/auth.service");

async function sendOtpHandler(req, res, next) {
  try {
    const { mobile } = req.body;
    const result = await sendOtpService(mobile);
    return res.json({
      error: null,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
async function checkOtpHandler(mobile, code) {}

module.exports = {
  sendOtpHandler,
  checkOtpHandler,
};
