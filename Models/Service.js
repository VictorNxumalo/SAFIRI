const mongoose = require("mongoose");  

const serviceSchema = new mongoose.Schema({  
  title: {  
    type: String,  
    required: [true, "Service title is required"],  
    trim: true  
  },  
  category: {  
    type: String,  
    enum: ["cleaning", "babysitting", "tutoring", "logistics"],  
    required: [true, "Category is required"]  
  },  
  description: {  
    type: String,  
    required: [true, "Description is required"]  
  },  
  price: {  
    type: Number,  
    required: [true, "Price is required"],  
    min: [50, "Minimum price is R50"]  
  },  
  provider: {  
    type: mongoose.Schema.Types.ObjectId,  
    ref: "User",  
    required: true  
  },  
  availability: {  
    type: [Date],  
    required: true  
  },  
  ratings: {  
    type: [Number],  
    min: 1,  
    max: 5  
  }  
});  

module.exports = mongoose.model("Service", serviceSchema);  