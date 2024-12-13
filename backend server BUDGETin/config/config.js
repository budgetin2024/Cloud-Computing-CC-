// config/config.js
module.exports = {
    SECRET_KEY: process.env.JWT_SECRET || "Token_1234", // Gunakan JWT_SECRET dari environment atau fallback ke default
  };