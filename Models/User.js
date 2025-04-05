const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Fix 1: Correct variable name from userChema -> userSchema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email format",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    match: [/^\d{10}$/, "Invalid phone number format"],
  },
  // Fix 2: Changed [String] to String and fixed enum values
  role: {
    type: String,
    enum: ["admin", "client", "provider"],
    default: "client",
  },
  servicesOffered: {
    type: [String],
    enum: [
      "cleaning",
      "babysitting",
      "gardening",
      "laundry",
      "cooking",
      "pet care",
      "handyman",
      "transportation",
      "elderly care",
      "child care"
    ],
    default: [],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Fix 3: Changed userChema -> userSchema (consistency)
userSchema.pre("save", async function (next) {  
    if (!this.isModified("password")) return next();  
    this.password = await bcrypt.hash(this.password, 10);  
    next();  
});

userSchema.methods.getSignedToken = function () {  
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {  
      expiresIn: process.env.JWT_EXPIRE  
    });  
};  

// Fix 4: Correct variable name in model export
module.exports = mongoose.model("User", userSchema);