const Koa = require('koa')
const cors = require('koa2-cors');
const Route = require('koa-router')

const app = new Koa()
const router = new Route()

router.get('/get', ctx => {
  console.log('getttt')
  // ctx.request.body = 'this is a get';
  ctx.body = 'body'
})

app.use(router.routes(),router.allowedMethods())
// app.use(cors())

app.listen(8080)
console.log('启动')
