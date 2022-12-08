const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`Role ${role} not exist.`);
  }
};

const isEmailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`Email ${email} exist.`);
  }
};

const isIdUserExist = async (id) => {
  const {_id} = await User.findById(id);
  if (!_id) {
    throw new Error(`Id ${id} not exist.`);
  }
};

module.exports = { isValidRole, isEmailExist, isIdUserExist };
