const mongoose = require("mongoose");
var mongoURL =
  "mongodb+srv://gerriesoh:gerriesoh@mern-commerce.odbnp.mongodb.net/mern-pizza?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
