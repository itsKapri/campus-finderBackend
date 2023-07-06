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
    courses: {
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
        type: Number,
        required: [true, "Please enter the college fees"],
    },
    placement_package: {
        type: Number,
        required: [true, "Please enter the placement package details"],
    },
    images: {
        college_img: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
            },
        },
        logo_img: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
            },
        },
    },
    rating: {
        type: Number,
        default: 0,
    },
    number_of_reviews: {
        type: Number,
        default: 0,
    },
    reviews: {
        name: {
            type: String,
            // required: true,
        },
        rating: {
            type: Number,
            // required: true,

        },
        comment: {
            type: String,
            // required: [true, "Please enter a comment"],
        },
    },
    createdAT:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Colleges", collegesSchema);
