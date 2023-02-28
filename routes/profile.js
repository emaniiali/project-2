const express = require('express')
const router = express.Router()
const isLoggedIn = require('../lib/isLoggedIn')

const profileController = require('../controllers/profile')

router.get('/profile/index', isLoggedIn, profileController.profile_index_get)
router.get('/profile/edit', profileController.profile_update_get)
router.post('/profile/edit', profileController.profile_update_post)
router.get('/profile/edit', profileController.profile_changePass_get)
router.post('/profile/edit', profileController.Profile_changePass_post)

module.exports = router