const { Router } = require('express');
const authController = require('../controllers/auth')
const like = require('../controllers/likes')

const router = Router()

router.post('/signup', authController.signUp)
router.post('/login', authController.login)
router.get('/profile/:id', authController.profile)
router.post('/signup', authController.signUp)
router.post('/like-movie/:id', like.likeMovie)
router.delete('/deslike-movie/:id', like.deslike)


module.exports = router;