const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require("path")

// Body Parser
router.use(express.urlencoded({ extended: true }))


const comicController = require('../controllers/comics')

const Storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({
    storage: Storage
})

router.get('/comic/index', comicController.comic_index_get)
router.get('/comic/all', comicController.comic_all_get)
router.get('/comic/detail', comicController.comic_detail_get)
router.get('/comic/add', comicController.comic_create_get)
router.post('/comic/add', upload.single("image"), comicController.comic_create_post)
router.get('/comic/delete', comicController.comic_delete_get)
router.get('/comic/edit', comicController.comic_update_get)
router.post('/comic/edit', comicController.comic_update_post)


router.post('/comic/all', comicController.review_create_post)

module.exports = router
