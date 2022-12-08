const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");

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

module.exports = router;
