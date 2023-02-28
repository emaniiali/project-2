const express = require('express')
const router = express.Router();

// Body Parser so we don't get undefined password error

router.use(express.urlencoded({ extended: true }))


const authCntrl = require('../controllers/auth')

router.get('/auth/signup', authCntrl.auth_signup_get)
router.get('/auth/signin', authCntrl.auth_signin_get)
router.post('/auth/signup', authCntrl.auth_signup_post)
router.post('/auth/signin', authCntrl.auth_signin_post)
router.get('/auth/signout', authCntrl.auth_signout_get)
module.exports = router