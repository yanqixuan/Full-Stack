const Koa = require('koa')
const mongoose = require('mongoose')
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const config = require('./config')  //配置文件引入

const app = new Koa();

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

app.use(exampleR.routes()).use(exampleR.allowedMethods());

app.listen(config.port,() => {
  console.log(config.port)
})
