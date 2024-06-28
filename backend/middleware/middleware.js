const jwt = require("jsonwebtoken");
const { users } = require("../model");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(404).json({
      message: "Please Log In !!",
    });
    return;
  }
  jwt.verify(token, process.env.SECRETKEY, async (err, decoded) => {
    if (err) {
      res.status(404).json({
        message: "Unauthorized !!",
      });
    } else {
      try {
        const userData = await users.findByPk(decoded.id);
        if (!userData) {
          res.status(404).json({
            message: "User Not Found !!a",
          });
          return;
        }
        req.user = userData;
        next();
      } catch (error) {
        res.status(500).json({
          message: "Internal Server Error !!",
        });
      }
    }
  });
};
