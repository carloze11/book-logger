const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Book = require('./book')
const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
})

// Prevent author from being removed if depended on
authorSchema.pre('remove', function(next){
    Book.find({ author: this.id }, (err, books) => {
        if (err) {
            next(err)
        } else if (books.length > 0){
            next(new Error("This author still has books."))
        } else {
            next()
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)