const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { jwtGenerator } = require("../helpers/jwtGenerator");

const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Validate user
    if (!user) {
      return res.status(400).json({
        msg: "Wrong User/Password.",
      });
    }

    // Validate Password
    if (!user.status) {
      return res.status(400).json({
        msg: "Wrong User/Password - status.",
      });
    }

    // Validate Password
    const passwordValidator = bcryptjs.compareSync(password, user.password);
    if (!passwordValidator) {
      return res.status(400).json({
        msg: "Wrong User/Password - pass.",
      });
    }

    // Generate JWT
    const token = await jwtGenerator(user.id);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: "Contact to adminitrator." });
  }
};

module.exports = { login };
