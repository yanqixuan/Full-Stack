const Koa = require('koa')
const mongoose = require('mongoose')
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
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

const exampleR = require('./routes/exampleR')
const login_route = require('./routes/login_route')

app.use(exampleR.routes()).use(exampleR.allowedMethods());
app.use(login_route.routes()).use(login_route.allowedMethods());

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
