
  module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "yourpassword",
    DB: process.env.DB_NAME || "cricket",
    PORT: process.env.DB_PORT || 3306
  };
 