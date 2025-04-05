const jwt = require("jsonwebtoken");  
const User = require("../models/User");  

// Protect routes (user must be logged in)  
exports.protect = async (req, res, next) => {  
  let token;  

  // Get token from header  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {  
    token = req.headers.authorization.split(" ")[1];  
  }  

  if (!token) {  
    return res.status(401).json({ error: "Not authorized" });  
  }  

  try {  
    // Verify token  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    req.user = await User.findById(decoded.id);  
    next();  
  } catch (err) {  
    res.status(401).json({ error: "Invalid token" });  
  }  
};  

// Restrict access by role (e.g., admin-only)  
exports.authorize = (...roles) => {  
  return (req, res, next) => {  
    if (!roles.includes(req.user.role)) {  
      return res.status(403).json({ error: "Access denied for your role" });  
    }  
    next();  
  };  
};  