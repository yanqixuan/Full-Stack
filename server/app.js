const Koa = require('koa')
const mongoose = require('mongoose')
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt')
const config = require('./config')  //配置文件引入

const app = new Koa();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useCreateIndex: true
}, (err) => {
  if (err) {
    console.log('数据库连接失败')
  } else {
    console.log('数据库连接成功')
  }
})

app.use(cors())
app.use(bodyParser())
// app.use(jwt({ secret:'secret' }).unless({ path: [/\/login/, /\/register/]})); //密钥secrect,忽略两个路由
// 在使用了jwt之后，所有路由除了unless都会检查Header首部中的token，是否存在有效。

app.use( async(ctx, next) => {
  // if(ctx.header.authorization)
  // console.log(ctx.header.authorization)
  // // console.log(ctx)
  let params  = Object.assign({}, ctx.request.query, ctx.request.body);
  // console.log(params)
  ctx.request.header = {'authorization': "Bearer " + (params.token || '')}
  console.log(ctx.request.header)
  await next()
})

app.use((ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
          ctx.status = 401;
          ctx.body = 'Protected resource, use Authorization header to get access\n';
      }else{
          throw err;
      }
  })
})

app.use(jwt({
  secret: 'secret'
}).unless({
  path: [/\/login/, /\/register/]
}));

const exampleR = require('./routes/exampleR')
const login_route = require('./routes/login_route')
const message_route = require('./routes/message')

app.use(exampleR.routes()).use(exampleR.allowedMethods());
app.use(login_route.routes()).use(login_route.allowedMethods());
app.use(message_route.routes()).use(message_route.allowedMethods());

io.on('connection', socket => {
  console.log('初始化成功，下面使用socket绑定和触发事件');
  // socket.on('send1', data =>{
  //   console.log('接收send1消息',data) 
  // })
  // socket.on('sendToId', data => {
  //   console.log('接收到id1的消息', data)
  // })

  socket.on('sendMsg',data => {
    console.log(data)
    // socket.emit('receiveMsg',data)
    io.sockets.emit('receiveMsg',data)
  })

})

server.listen(config.port,() => {
  console.log(config.port)
})
