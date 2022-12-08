const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.authPath = "/api/auth";
    this.userPath = "/api/users";

    // Database
    this.dbConnect();

    // Middlewares
    this.midlewares();

    // Routes
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  midlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.userPath, require("../routes/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
