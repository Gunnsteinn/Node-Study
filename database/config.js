const mongoose = require("mongoose");
const logger = require("../services/loggerService");

const dbConnection = async () => {
  try {
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
