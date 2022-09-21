const mongoose = require('mongoose');


//----Documentation----
// https://mongoosejs.com/docs/guide.html

//----Schema----
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
}, { timestamps: true });

//----Export----
module.exports = mongoose.model('Category', categorySchema);
