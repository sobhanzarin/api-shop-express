const router = require("express").Router();

router.post("/send-otp", (req, res) => {
  res.send("coming soon...");
});

module.exports = {
  authRoutes: router,
};
