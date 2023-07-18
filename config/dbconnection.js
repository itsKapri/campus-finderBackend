const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'Directory', // data base name 
    });
    console.log('Database connection:', connect.connection.host);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
