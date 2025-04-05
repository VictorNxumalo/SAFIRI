const express = require("express");  
const router = express.Router();  
const User = require("../models/User");  
const bcrypt = require("bcryptjs");  
const jwt = require("jsonwebtoken");  

// Register a new user  
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, location } = req.body;
    console.log("Request Body:", req.body); // Log incoming data

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email); // Log duplicate
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({ name, email, password, phone, location });
    console.log("User created:", user); // Log success

    const token = user.getSignedToken();
    res.status(201).json({ success: true, token });
  } catch (err) {
    console.error("Registration Error:", err); // Detailed error log
    res.status(500).json({ error: "Server error" });
  }
});

// Login user  
router.post("/login", async (req, res) => {  
  try {  
    const { email, password } = req.body;  

    // Check if user exists  
    const user = await User.findOne({ email }).select("+password");  
    if (!user) {  
      return res.status(401).json({ error: "Invalid credentials" });  
    }  

    // Validate password  
    const isMatch = await bcrypt.compare(password, user.password);  
    if (!isMatch) {  
      return res.status(401).json({ error: "Invalid credentials" });  
    }  

    // Generate token  
    const token = user.getSignedToken();  

    res.status(200).json({ success: true, token });  
  } catch (err) {  
    res.status(500).json({ error: "Server error" });  
  }  
});  

module.exports = router;  