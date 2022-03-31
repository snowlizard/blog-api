const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title : { type: String, required: true},
    article: { type: String, required: true},
    published: { type: Date, required: true},
    feature: { type: Boolean, required: true},
    author : { type: Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Blog', blogSchema);