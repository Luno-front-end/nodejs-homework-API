const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = process.env.CONNECTION_DB;

const db = mongoose.connect(connectDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Mangoose connection to db");
});

mongoose.connection.on("error", (error) => {
  console.log(`Mangoose connection error ${error.message}`);
});

mongoose.connection.on("disconetcted", () => {
  console.log("Mangoose disconetcted");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connection for db closed");
  process.exit(1);
});

module.exports = db;
