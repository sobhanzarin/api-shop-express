const router = require("express").Router();
const { productRoutes } = require("./routes/product.router");

router.use("/api/product", productRoutes);

module.exports.allRoutes = router;
