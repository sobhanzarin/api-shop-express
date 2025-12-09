const jwt = require("jsonwebtoken");
const SECRET_ACCESS = process.env.TOKEN_SECRET_ACCESS;
const SECRET_REFRESH = process.env.TOKEN_SECRET_REFRESH;
const EXPIRES_ACCESS = "7d";
const EXPIRES_REFRESH = "14d";

const generateAccessToken = (payload) => {
  return jwt.sign(payload, SECRET_ACCESS, { expiresIn: EXPIRES_ACCESS });
};
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, SECRET_REFRESH, { expiresIn: EXPIRES_REFRESH });
};
const verifyAccessToken = (token) => {
  try {
    jwt.verify(token, SECRET_ACCESS);
  } catch (error) {
    return null;
  }
};
const verifyRefreshToken = (token) => {
  try {
    jwt.verify(token, SECRET_REFRESH);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
