const User = require('../models/User')
const passport = require('../lib/passportConfig')

//to encrypt pass
const bcrypt = require('bcrypt')

exports.auth_signup_get = (req, res) => {
    res.render('auth/signup')
}

exports.auth_signin_get = (req, res) => {
    // console.log("this is user id: ", req.session.User._id)

    res.render('auth/signin')
}

exports.auth_signup_post = (req, res) => {
    let user = new User(req.body);
    let hash = bcrypt.hashSync(req.body.password, 10)//number to encrypt the min num 8
    // this will change user pass to hashed one 
    user.password = hash
    //save user in the DB
    user.save()
        .then(() => {
            // console.log('User ID:', req.user._id);
            res.redirect('/auth/signin')
        })
        .catch((err) => {
            console.log(err);
            res.send('please try again later')
        })
}

exports.auth_signin_post = passport.authenticate('local', {
    // to tedirect user to any where he want
    successRedirect: '/',
    failureRedirect: '/auth/signin'
})


exports.auth_signout_get = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('/auth/signin')
    })
}