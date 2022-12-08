const { Router } = require("express");
const { check } = require("express-validator");
const logger = require("../services/loggerService");

// const { validator } = require("../middlewares/validator");
// const { jwtValidator } = require("../middlewares/jwt-validator");
// const {
//   roleValidator,
//   rolesValidator,
// } = require("../middlewares/role-validator");

const { validator, jwtValidator, rolesValidator } = require("../middlewares");

const {
  isValidRole,
  isEmailExist,
  isIdUserExist,
} = require("../helpers/db-validators");

const {
  getUser,
  saveUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const router = Router();

const logRequest = (req, res, next) => {
  const { protocol, hostname, originalUrl } = req;
  const port = process.env.PORT || "8080";
  const fullUrl = ``;
  logger.info(
    `${req.method} to ${protocol}://${hostname}:${port}${originalUrl} route is accessed`
  );
  next();
};
router.get("/", logRequest, getUser);
router.post(
  "/",
  [
    logRequest,
    check("name", "Wrong or empty name.").not().isEmpty(),
    check("password", "Wrong password.").isLength({ min: 6 }),
    check("email", "Wrong email.").isEmail().custom(isEmailExist),
    check("role").custom(isValidRole),
    validator,
  ],
  saveUser
);
router.put(
  "/:id",
  [
    logRequest,
    check("id", "Wrong id.").isMongoId(),
    check("id").custom(isIdUserExist),
    check("role").custom(isValidRole),
    validator,
  ],
  updateUser
);
router.delete(
  "/:id",
  [
    logRequest,
    jwtValidator,
    // roleValidator,
    rolesValidator("ADMIN_ROLE", "SELLER_ROLE"),
    check("id", "Wrong id.").isMongoId(),
    check("id").custom(isIdUserExist),
    validator,
  ],
  deleteUser
);

module.exports = router;
