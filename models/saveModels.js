const mongoose = require("mongoose");
const saveCollegeSchema = mongoose.Schema({
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Colleges", 
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    username:{
        type:String,
        required: true,
    },
    createdAT: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("Savecollege", saveCollegeSchema);