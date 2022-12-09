const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { jwtGenerator } = require("../helpers/jwt-generator");
const { googleVerify } = require("../helpers/google-verify");
const e = require("express");

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: ":p",
        role: "USER_ROLE",
        img: picture,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        ok: false,
        msg: "Contact administration, user blocked.",
      });
    }

    // Generate JWT
    const token = await jwtGenerator(user.id);
    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Token is not valid.",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
