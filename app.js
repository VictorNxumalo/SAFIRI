const { MongoClient } = require('mongodb');  
const uri = "mongodb+srv://Victor-Founder:0202035134081aA*@dev-cluster.gykplnc.mongodb.net/?retryWrites=true&w=majority";   // Replace PASSWORD with your actual password!  
const client = new MongoClient(uri);  
require('dotenv').config(); // Load environment variables  
const connectDB = require('./config/db');  
const express = require('express');  
const authRoutes = require("./routes/auth");  
const { protect, authorize } = require("./middleware/auth");  


async function run() {  
  try {  
    await client.connect();  
    const db = client.db('SafiriCareDB'); // Your DB name  
    const users = db.collection('Users'); // Your collection name  
    const data = await users.find().toArray();  
    // console.log("Data from Users collection:", data);  Logging the users collection data
  } finally {  
    await client.close();  
  }  
}  

run().catch(console.dir);  

const app = express();  

// Connect to MongoDB  
connectDB();  
// Middleware  
app.use(express.json());  // Parse JSON bodies  

// Routes  
app.use("/api/v1/auth", authRoutes);  

// Protected route example (admin-only)  
app.get("/api/v1/admin", protect, authorize("admin"), (req, res) => {  
  res.status(200).json({ success: true, user: req.user });  
});  


// Start server  
const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {  
  console.log(`Server running on port ${PORT}`);  
});  
