const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "owner is required!"]
    },
    title: {
        type: String,
        required: [true, "title is required!"],
        minLength: [8, "Title should be atleast 8 characters long!"],
        maxLength: [255, "Title should not be more than 255 character long!"]
    },
    type: {
        type: String,
        enum: ["commercial", "residential"],
        required: [true, "Type of property is required!"]
    },
    description: {
        type: String,
        minLength: [20, "decription must be atleast 20 characters long!"],
        maxLength: [1000, "description cannot be more than 1000 characters!"],
        requires: [true, "description is required!"]
    },
    price: {
        type: Number,
        minLength: [5, "Price cannot be less than 1 lac rupees!"],
        maxLength: [12, "Price cannot be more than 10,000 crore!"],
        required: [true, "Price is required!"]
    },
    images: {
        type: String,
        required: [true, "Image is required!"]
    },
    areaType: {
        type: String,
        enum: ["square-meters", "marla", "kanal"],
        required: [true, "area description is required!"]
    },
    area: {
        type: Number,
        required: [true, "area is required!"]
    },
    city: {
        type: String,
        required: [true, "city is required!"]
    }

}, {timestamps: true});

module.exports = mongoose.model("Property", propertySchema);