const indexValidator = require("../middlewares/validator");
const indexJwtValidator = require("../middlewares/jwt-validator");
const indexRolesValidator = require("../middlewares/role-validator");
const { logRequest } = require("../middlewares/logger");

module.exports = {
  ...indexValidator,
  ...indexJwtValidator,
  ...indexRolesValidator,
  logRequest,
};
