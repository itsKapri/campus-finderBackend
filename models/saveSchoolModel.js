const mongoose = require("mongoose");
const saveSchoolSchema = mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School", 
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


module.exports = mongoose.model("Saveschool", saveSchoolSchema);