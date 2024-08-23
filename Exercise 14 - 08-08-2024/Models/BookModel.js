const mongoose = require("mongoose");

const bookModel = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Publish: {
        type: Number,
        required: true
    },
    Genre: {
        type: [String]
    },
    NumberOfCopies: {
        type: Number,
        default: 5
    }
});


module.exports = mongoose.model("Books", bookModel);