const { validate, Joi } = require("express-validation");
const { ProductType } = require("../utils/product.constant");

const createProductValidation = validate({
  body: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().optional().allow(null),
    discount: Joi.number().optional().allow(null),
    type: Joi.string()
      .valid(...Object.vslues(ProductType))
      .required(),
    count: Joi.number().optional().allow(null),
    active_discount: Joi.boolean().optional().allow(null),
    details: Joi.array().items(
      Joi.object({
        key: Joi.string().required(),
        value: Joi.string().required(),
      })
    ),
    colors: Joi.array().items(
      Joi.object({
        color_name: Joi.string().required(),
        color_code: Joi.string().required(),
        count: Joi.number().optional().allow(null),
        price: Joi.number().optional().allow(null),
        discount: Joi.number().optional().allow(null),
        active_discount: Joi.boolean().optional().allow(null),
      })
    ),
    sizes: Joi.array().items(
      Joi.object({
        size: Joi.string().required(),
        count: Joi.number().optional().allow(null),
        price: Joi.number().optional().allow(null),
        discount: Joi.number().optional().allow(null),
        active_discount: Joi.boolean().optional().allow(null),
      })
    ),
  }),
});

module.exports = { createProductValidation };
