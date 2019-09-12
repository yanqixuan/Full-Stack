const Router = require('koa-router')
const router = new Router();
const { postRegister, postLogin } = require('../controllers/login_control')

router.post('/register/post', postRegister)
router.post('/login/post', postLogin)

module.exports = router