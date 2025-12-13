const createHttpError = require("http-errors");
const { verifyAccessToken } = require("../../utils/jwt.token");
const User = require("../../models/user.model");

const authGuard = async (req, res, next) => {
  try {
    const accessToken = req.headers?.authorization;
    if (!accessToken && typeof refreshToken !== "string")
      throw createHttpError(401, "وارد حساب کاربری خود شوید.");
    const [bearer, token] = accessToken?.split(" ");
    if (!token || !bearer || bearer?.toLowerCase() !== "bearer") {
      throw createHttpError(401, "وارد حساب کاربری خود شوید.");
    }
    const decoded = verifyAccessToken(accessToken);
    if (decoded?.userId) {
      const user = await User.findByPk(decoded?.userId);
      req.user = {
        id: user.id,
        mobile: user.mobile,
      };
      return next();
    }
    throw createHttpError(401, "وارد حساب کاربری خود شوید.");
  } catch (error) {
    next(error);
  }
};

module.exports = authGuard;
