const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const roleValidator = async (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "The token must be validated first.",
    });
  }

  const { role, name } = req.user;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name}, you need to have admin roles to run the action.`,
    });
  }

  next();
};

const rolesValidator = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "The token must be validated first.",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The Services requires one of these roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  roleValidator,
  rolesValidator,
};
