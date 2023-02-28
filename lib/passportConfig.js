const passport = require("passport")

const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

//save user info (id) in a session 
passport.serializeUser(function (user, done) {
    done(null, user.id)
})
//take info from session and find user in the db
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})

passport.use(new LocalStrategy({
    usernameField: 'emailAddress',
    passwordField: 'password'//same as in model
},
    function (emailAddress, password, done) {
        User.findOne({ emailAddress }, function (err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false)
            }
            if (!user.verifyPassword(password)) {
                return done(null, false)
            }
            return done(null, user)

        })
    })
)

module.exports = passport