const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { countDocuments } = require("../models/user");

const getUser = async (req, res = response) => {
  const { limit = 5, offset = 0 } = req.query;
  const status = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(status),
    User.find(status).skip(Number(offset)).limit(Number(limit)),
  ]);

  res.json({ total, users });
};

const saveUser = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();
  res.json({
    user,
  });
};

const updateUser = async (req, res = response) => {
  const { id } = req.params;
  const { password, google, ...others } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    others.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, others);

  res.json({
    user,
  });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  // Physical erasure.
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, { status: false });
  res.json(user);
};

module.exports = {
  getUser,
  saveUser,
  updateUser,
  deleteUser,
};
