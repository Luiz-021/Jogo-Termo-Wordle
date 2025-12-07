const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    word:{
        type: String,
        required: true,
        unique: true,
        length: 5,
        uppercase: true,
        trim: true
    },
    normalized: {
        type: String,
        required: true, 
        unique: true, 
        lowercase: true 
    }
});

const Word = mongoose.model('Word', WordSchema);

module.exports = Word;