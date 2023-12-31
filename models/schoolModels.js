const mongoose = require("mongoose");

const schoolsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name of the school"],
    },
    location: {
        city: {
            type: String,
            required: [true, "Please enter the city"],
        },
        pincode: {
            type: Number,
            required: [true, "Please enter the pincode"],
            minlength: [6, "Pincode should have a minimum length of 6 digits"],
            maxlength: [6, "Pincode should have a maximum length of 6 digits"],
        },
        state: {
            type: String,
            required: [true, "Please enter the state"],
        },
    },
    images: {
        school_img: {
            type: [String],
        },
        logo_img: {
            type: String
        },
    },
    type_Of_board: {
        type: [String],
        required: [true, "Please enter the type Of Board"],

    },
    description: {
        type: String,
        required: [true, "Please enter the description"],
    },
    documents_required_for_admission: {
        type: [String],
        required: [true, "Please enter the documents Required for admission"],
    },
    contact_information: {
        school_email: {
            type: String,
        },
        school_contact: {
            type: [Number],
        }
    },
    fees: {
        type: Number,
        required: [true, "Please enter the fees"],
    },
    type_Of_school: {
        type: [String],
        enum: ["public", "private", "hybrid"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
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
    createdAT: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("School", schoolsSchema);
