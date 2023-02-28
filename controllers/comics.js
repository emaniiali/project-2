const Comic = require('../models/Comic')
const User = require('../models/User')
const Review = require('../models/Review')

// Display comic create form on GET
exports.comic_create_get = function (req, res) {
    res.render('comic/add')
}

// Handle comic create on POST
exports.comic_create_post = function (req, res) {
    console.log('create post body: ', req.session)

    req.body.user = req.session.passport.user //user is the one that is stored in the session
    // create a new comic with the form data
    let comic = new Comic(req.body)

    let imagePath = req.file.filename;
    console.log(imagePath);
    comic.image = imagePath;

    // add the logged-in user's information to the comic
    // comic.user.push(req.session.user._id)

    // save the comic to the database

    comic.save()
        .then(function () {
            res.redirect('/comic/index')
        })
        .catch(function (err) {
            console.log(err)
            res.send('An error occurred please try again later')
        })
}

// Display list of all comics
exports.comic_index_get = function (req, res) {
    // find all comics and populate the user field with user data
    Comic.find().populate('user')

        .then(function (comics) {
            console.log('comics get then', comics)
            // render the comic index page with the list of comics
            res.render('comic/index', { comics }) // articles: articles
        })
        .catch(function (err) {
            console.log(err)
        })
}

exports.comic_all_get = function (req, res) {
    // find all comics and populate the user field with user data
    Comic.find().populate('user')

        .then(function (comics) {
            console.log('comics get then', comics)
            // render the comic index page with the list of comics
            res.render('comic/all', { comics }) // comics : comics
        })
        .catch(function (err) {
            console.log(err)
        })
}

exports.comic_detail_get = (req, res) => {
    Comic.findById(req.query.id)
        .then(comic => {
            res.render('comic/detail', { comic })
        })
        .catch((err) => {
            console.log(err)
        })
}

/*
// Display detail page for a specific comic
exports.comic_show_get = function(req,res) {
    Comic.findById(req.query.id)
    .then(function (comic) {
        res.render('comic/detail', {comic})
    })
    .catch(function(err) {
        console.log(err)
    })
}
*/

// Handle comic delete on GET
exports.comic_delete_get = (req, res) => {
    // find the comic with the specified ID and delete it
    Comic.findByIdAndDelete(req.query.id)
        .then(() => {
            // redirect to the comic index page
            res.redirect('/comic/index')
        })
        .catch((err) => {
            console.log(err);
            res.send('please try again later')
        })
}

// HTTP Update GET - Comic
exports.comic_update_get = function (req, res) {
    Comic.findById(req.comic._id)
        .then(function (comic) {
            res.render('comic/edit', { comic })
        })
        .catch(function (err) {
            console.log(err)
        })
}

// HTTP Update POST - Comic

exports.comic_update_post = function (req, res) {
    Comic.findByIdAndUpdate(req.comic._id, req.comic)
        .then(function () {
            console.log(req.comic)
            res.redirect('/comic/index')
        })
        .catch(function (err) {
            console.log(err)
        })
}

// HTTP Create Review for specific comic in all page - POST

exports.review_create_post = function(req, res) {
    console.log(req.body)
    let review = new Review (req.body)
    review.save()
      .then(function () {
        res.redirect('/comic/all')
      })
      .catch(function (err) {
        console.log(err)
        res.send('An error occurred please try again later')
      })
}

exports.review_detail_get = (req, res) => {
    Review.findById(req.review._id)
    .then(reviews => {
        res.render('comic/detail', {reviews})
    })
    .catch((err) => {
        console.log(err)
    })
}




