const mongoose = require("mongoose");
const logger = require("pino")();

const dbConnection = async () => {
  try {
    logger.info("ACAAAAAAA" + process.env.MONGO_CNN);
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info("Database UP");
  } catch (error) {
    console.log(error);
    throw new Error("Cannot connect to the database..");
  }
};
module.exports = { dbConnection };
