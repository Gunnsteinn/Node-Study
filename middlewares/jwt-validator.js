const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const jwtValidator = async (req = request, res = response, next) => {
  const token = req.header("X-Token");
  if (!token) {
    return res.status(401).json({
      msg: "Token is required.",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({
        msg: "User not Exist.",
      });
    }
 
    if (!user.status) {
      return res.status(401).json({
        msg: "Token is not valid.",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Wrong Token.",
    });
  }
};

module.exports = {
  jwtValidator,
};
