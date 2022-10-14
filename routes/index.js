const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const authController = require('../controllers/auth')


router.get('/', async (req, res) => {
    if (!req.user) {
        return res.redirect('login')
    }
    let books
    try {
        books = await Book.find({userId: req.user.id}).sort({creatAt: 'desc'}).limit(10).exec()
    } catch {
        books = []
    }
    res.render('index', {books: books})
})

router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/sign-up', authController.getSignUp)
router.post('/sign-up', authController.postSignUp)
router.get('/logout', authController.logout)

module.exports = router