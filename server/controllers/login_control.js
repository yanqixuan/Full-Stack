const user_module = require('../models/user_models')
const jsonwebtoken = require('jsonwebtoken')

const postLogin = async (ctx, next) => {
  const req = ctx.request.body;
  // console.log(req)
  ctx.status = 200;
  const result = await user_module.create({username:req.username, password:req.password});
  ctx.body = {
    msg:'user post',
    data:result
  }
}

const getLogin = async (ctx, next) => {
  ctx.status = 200;
  const req = ctx.request.query;
  const result = await user_module.find({username:req.username, password:req.password});
  console.log(req.username)

  const payload = {user_name:req.username, password:req.password}
  // const token = jsonwebtoken.sign({  //生成token返回给客户端
  //   data: result,
  //   exp:  Math.floor(Date.now() + 10) //过期时间为10s
  // }, 'secret')
  const token = jsonwebtoken.sign(
    payload, 'secret', { expiresIn: 10}
  )
  // ctx.set('Set-Cookie',token)
  // ctx.set('HttpOnly',false)
  // ctx.cookies.set(
  //   token,
  //   {
  //     httpOnly: false,
  //     path:'/home/message'
  //   }
  // )
  ctx.body = {
    msg:'login get',
    data:{
      data:req,
      result,
      token
    }
  }
  
}

module.exports = {
  getLogin,
  postLogin
}