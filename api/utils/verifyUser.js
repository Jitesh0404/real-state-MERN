const errorHandler = require("./error");
const jwt = require("jsonwebtoken");
 const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("Token is : ",token);
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  console.log("After token ====");
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Forbidden"));
    }
    req.user = user;
    next();
  });
};
module.exports={
  verifyToken
}
