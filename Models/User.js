const mongoose = require('mongoose');

const userChema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required:[true, 'Email is required'],
        unique: true,
       lowercase: true,
       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email format"] 
    },
    password: {
        type: String,
        required:[true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    phone: {
        type: String,
        required:[true, 'Phone number is required'],
        unique: true,
        match: [/^\d{10}$/, "Invalid phone number format"]
    },
    role:{
        type: [string],
        enum: ['admin', 'user','admin'],
        default:[]
    },
    servicesOffered: {
        type: [String],
        enum: ["cleaning","babysitting","gardening","laundry", "cooking", "pet care", "handyman", "transportation", "elderly care", "child care"], 
        default: []
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//Exporting the model 
module.exports = mongoose.model('User', userChema); // 'User' is the name of the collection in MongoDB, and userSchema is the schema defined above.
// The model will be used to interact with the Users collection in the MongoDB database.