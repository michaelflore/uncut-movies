const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Movie = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
        default: 'https://uncutmovies.s3.amazonaws.com/default-image.jpg'
    },
    imageKey: {
        type: String,
        required: false,
        default: 'default-image/jpg'
    }
}, { collection: "movies" });

module.exports = mongoose.model('Movie', Movie);