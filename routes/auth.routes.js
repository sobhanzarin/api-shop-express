const {
  sendOtpHandler,
  checkOtpHandler,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/send-otp", sendOtpHandler);
router.post("/check-otp", checkOtpHandler);
router.get("/my-account", (req, res) => {
  res.send("....");
});

module.exports = {
  authRoutes: router,
};
