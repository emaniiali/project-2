const mongoose = require('mongoose')
const reviewSchema = mongoose.Schema({
    comic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comic' // the Comic model
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // the User model
    },
    review: String,
},
    {
        timestamps: true
    })

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review