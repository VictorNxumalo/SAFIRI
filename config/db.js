// config/db.js  
const mongoose = require('mongoose');  

const connectDB = async () => {  
  try {  
    await mongoose.connect(process.env.MONGODB_URI); // Remove deprecated options  
    console.log('MongoDB Connected');  
  } catch (err) {  
    console.error('Connection Failed:', err.message);  
    process.exit(1);  
  }  
};  

module.exports = connectDB;  