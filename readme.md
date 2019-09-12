# wexin PC版全栈项目

## 向特定的socketid 发送信息
如何获得这个 socketId ，就是生成一个哈希数组，key为username，值为socket.id，这样就可以通过用户名获取对应的id，进而可以向特定client推送消息。
io.sockets.connected[socketid].emit();

## token
  - 前端登录login路由，后端控制login路由中，拿到前端登录的账号密码，基于此账号密码使用jsonwebtoken.sign创建了一个token，为了方便，secret密钥设置为了'secret'，设置expiresIn:10，也就是过期时间为10s。并将它放在ctx.body中返回给前端。

  - 前端在res中拿到信息后，先清除本地token缓存,localStorage.clear(),localStorage.removeItem('user_token'),
  再重新设置token,localStorage.setItem('user_token',res.data.data.token).将token设置到了本地缓存。

  - 在请求需要验证token的页面时，比如/home/message页面。请求时，设置请求头 'authorization' 并拼接成后端验证token时需要的格式  "authorization":"Bearer " + token。

  - 前端请求后.catch里处理token过期，在.catch中alert要求重新登录，并使用this.props.history.push跳转到登录页。
  
  - 后端直接使用 koa-jwt 处理验证token，先建立一个捕捉错误的中间件，token不存在或过期则返回401错误，再使用jwt中间件，
  设置secret密钥为'secret'，并使用unless排除注册路由和登录路由。
  app.use( jwt({secret: 'secret'} ).unless( {path: [/\/login/, /\/register/]} ));

## socket.io
  - 前端src文件下单独抽离socket实例，Message和SendMessage组件引入实例，在点击发送按钮时，emit一个sendmsg事件,并传入
  用户名，发送的消息，发送消息的时间，socketid。
  - 后端app.js,app.on('connection', socket => {})初始化socket，socket.on('sendmsg'),监听sendmsg事件，并获取前端发来的信息，监听到了sendmsg事件后，使用io.sockets.emit('receivemsg',data)向所有的socket广播一个receivemsg事件，传入data。
  - 前端message组件，监听sendmsg事件，获取data，把它push到state中的message数组中，在页面上显示。

## koa mongodb
  - 从config文件引入相关配置，引入mongoose连接数据库,mongoose.connect(config.db,{useCreateIndex:true})自动创建索引
  - 后端文件分为，routes，models，controllers，app.js,config.js
    - routes:路由文件夹，其中的每个文件只创建路由，指定路由路径，路由的相关操作放在controllers目录
    - controllers：路由控制文件夹，处理路由操作，需要引入models目录中的数据模型
    - models：文档模型文件夹，user_model,引入mongoose，创建一个userSchema,定义username为string，require:true代表非空，定义password为string，非空。定义在user表中，{collection:'user'}。再使用mongoose.model('user',userSchema),创建为文档模型并输出。
    - koa使用的中间件:koa-cors,koa-bodyparser,koa-jwt.
      中间件顺序：cors,bodyparser,设置请求头，token处理函数包含koa-jwt验证，引入使用路由，初始化socket，监听端口。