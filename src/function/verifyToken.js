const jwt = require("jsonwebtoken");

// Fungsi otorisasi di bagian header
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Mohon input token terlebih dahulu",
    });
  }

  jwt.verify(token, "secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Token tidak valid.",
      });
    }

    req.user = decoded; // Store user information in the request object
    next();
  });
};

module.exports = verifyToken;