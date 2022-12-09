const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");

const { validator } = require("../middlewares/validator");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Wrong email.").isEmail(),
    check("password", "Wrong password.").not().isEmpty(),
    validator,
  ],
  login
);

router.post(
  "/google",
  [check("id_token", "Google token is mandatory.").not().isEmpty(), validator],
  googleSignIn
);

module.exports = router;
