const mongoose = require("mongoose");
const collegesSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the college name"],
    },
    description: {
        type: String,
        required: [true, "Please enter the college description"],
    },
    location: {
        city: {
            type: String,
            required: [true, "Please enter the city"],
        },
        state: {
            type: String,
            required: [true, "Please enter the state"],
        },
    },
    website: {
        type: String,
        required: [true, "Please enter the website URL"],
    },
    Specializations: {
        type: [String],
        required: [true, "Please enter the courses offered"],
    },
    exams: {
        type: [String],
        required: [true, "Please enter the exams required"],
    },
    ranking: {
        type: String,
        required: [true, "Please enter the college ranking"],
    },
    fees: {
        BE:{
            type:Number,
        },
        MCA:{
            type:Number,
        }
    },
    Salary:{
        type:Number
    },
    placement_package: {
        type: Number,
        required: [true, "Please enter the placement package details"],
    },
    images: {
        college_img: {
                type: [String],
                required: true,
        },
        logo_img: {
            type: String,
            required: true,
        },
    },
    Owenrship:{
        type: String,
        enum: ["public", "private", "hybrid"],
    },
    Address:{
        type:String
    },
    Phone:{
        type:Number,
        required:true
    },
    email:{
        type:String
    },
    ratings: {
        type: Number,
        default: 0,
    },
    number_of_reviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
    createdAT:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Colleges", collegesSchema);
