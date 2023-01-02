const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pdfs: Array,
    images: Array,
    videos: Array
});


const Chapters = mongoose.model('chapters', chapterSchema);
module.exports = Chapters;