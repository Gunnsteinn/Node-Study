const indexValidator = require("../middlewares/validator");
const indexJwtValidator = require("../middlewares/jwt-validator");
const indexRolesValidator = require("../middlewares/role-validator");

module.exports = {
  ...indexValidator,
  ...indexJwtValidator,
  ...indexRolesValidator,
};
