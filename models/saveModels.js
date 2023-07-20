const mongoose = require("mongoose");
const saveCollegeSchema = mongoose.Schema({
    // name: {
    //     type: String,
    //     required: [true, "Please enter the college name"],
    // },
    // location: {
    //     city: {
    //         type: String,
    //         required: [true, "Please enter the city"],
    //     },
    //     state: {
    //         type: String,
    //         required: [true, "Please enter the city"],
    //     }
    // }, ranking: {
    //     type: Number,
    //     required: [true, "Please enter the college ranking"],
    // }, fees: {
    //     BE: {
    //         type: Number,
    //     },
    //     MCA: {
    //         type: Number,
    //     }
    // },
    // logo_img: {
    //     type: String,
    //     required: true,
    // }, Owenrship: {
    //     type: String,
    //     enum: ["public", "private"],
    // }, ratings: {
    //     type: Number,
    //     default: 0,
    // },
    college:{
        type:Object
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