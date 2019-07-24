const Router = require('koa-router')
const router = new Router();
const exampleC = require('../controllers/exampleC');

router.get('/example/get', exampleC.getExample);
router.post('/example/post', exampleC.postExample);

module.exports = router