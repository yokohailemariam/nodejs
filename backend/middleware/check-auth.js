const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret");
    req.userData = decodedToken;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Invalid or expired token provided!",
      error: e,
    });
  }
  // const token = req.header("x-check-auth-token");
  // if (!token) {
  //   return res.status(401).json({ message: "No Token, authorization denied" });
  // }
  // try {
  //   const decoded = jwt.verify(token, "secret");
  //   req.user = decoded.user;
  //   next();
  // } catch (error) {
  //   res.status(401).jsom({ message: "Token is not valid" });
  // }
}

module.exports = {
  checkAuth: checkAuth,
};
