const Router = require('koa-router')
const router = new Router();
const { postLogin, getLogin } = require('../controllers/login_control')

router.post('/login/post', postLogin)
router.get('/login/get', getLogin)

module.exports = router