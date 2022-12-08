const jwt = require("jsonwebtoken");

const jwtGenerator = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_OR_PRIVATE_KEY,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Failed to generate token.");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { jwtGenerator };
