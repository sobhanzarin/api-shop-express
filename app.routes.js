const router = require("express").Router();
const { authRoutes } = require("./routes/auth.routes");
const { productRoutes } = require("./routes/product.routes");

router.use("/api/product", productRoutes);
router.use("/api/auth", authRoutes);

module.exports.allRoutes = router;
