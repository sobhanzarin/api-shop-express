const sequelize = require("../config/db.config");
const OtpCode = require("./otp_user.model");
const Product = require("./product.model");
const ProductColor = require("./product_color.model");
const ProductDetail = require("./product_detail.model");
const ProductSize = require("./product_size.model");
const User = require("./user.model");
const RefreshToken = require("./refresh_token.model");
const Basket = require("./basket.model");
const Discount = require("./discount.model");

// product -> product details
Product.hasMany(ProductDetail, {
  as: "details",
  foreignKey: {
    name: "productId",
    onDelete: "CASCADE",
  },
});
ProductDetail.belongsTo(Product, {
  as: "product",
  foreignKey: {
    name: "productId",
    onDelete: "CASCADE",
  },
});

// product -> product color
Product.hasMany(ProductColor, {
  as: "colors",
  foreignKey: {
    name: "productId",
    onDelete: "CASCADE",
  },
});
ProductColor.belongsTo(Product, {
  as: "product",
  foreignKey: {
    name: "productId",
    onDelete: "CASCADE",
  },
});

// product -> product size
Product.hasMany(ProductSize, {
  as: "sizes",
  foreignKey: {
    name: "productId",
    onDelete: "CASCADE",
  },
});
ProductSize.belongsTo(Product, {
  as: "product",
  foreignKey: {
    name: "productId",
    onDelete: "CASCADE",
  },
});
// user -> otp
User.hasMany(OtpCode, {
  as: "otp",
  foreignKey: {
    name: "userId",
  },
});

OtpCode.belongsTo(User, {
  as: "user",
  foreignKey: {
    name: "userId",
  },
});

// product -> basket
Product.hasMany(Basket, {
  as: "basket",
  foreignKey: {
    name: "productId",
  },
});
ProductColor.hasMany(Basket, {
  as: "basket",
  foreignKey: {
    name: "colorId",
  },
});
ProductSize.hasMany(Basket, {
  as: "basket",
  foreignKey: {
    name: "sizeId",
  },
});
User.hasOne(Basket, {
  as: "basket",
  foreignKey: {
    name: "userId",
  },
});

Basket.belongsTo(Product, {
  as: "product",
  foreignKey: {
    name: "productId",
  },
});
Basket.belongsTo(ProductColor, {
  as: "color",
  foreignKey: {
    name: "colorId",
  },
});
Basket.belongsTo(ProductSize, {
  as: "size",
  foreignKey: {
    name: "sizeId",
  },
});
Basket.belongsTo(User, {
  as: "user",
  foreignKey: {
    name: "userId",
  },
});

// discount -> basket
Discount.hasMany(Basket, {
  as: "basket",
  foreignKey: {
    name: "discountId",
  },
});
Basket.belongsTo(Discount, {
  as: "discount",
  foreignKey: {
    name: "discountId",
  },
});

const syncModel = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = {
  syncModel,
  Product,
  ProductColor,
  ProductDetail,
  ProductSize,
};
