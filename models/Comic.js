const mongoose = require('mongoose')
const comicSchema = mongoose.Schema({
    title: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // the User model
    },
    genre: String,
    datePublished: String,
    noEpisodes: Number,
    description: String,
    completed: Boolean,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    image: String
},
    {
        timestamps: true
    })

const Comic = mongoose.model('Comic', comicSchema)

module.exports = Comic