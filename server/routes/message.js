const Router = require('koa-router')
const router = new Router();

router.get('/home/message', async(ctx, next) => {
  ctx.status = 200
  const req = ctx.request.query
  ctx.body = {
    req
  }
  // console.log(ctx.headers)
})

module.exports = router