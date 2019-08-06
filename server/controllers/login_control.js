const user_module = require('../models/user_models')

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
  ctx.body = {
    msg:'login get',
    data:{
      data:req,
      result
    }
  }
}

module.exports = {
  getLogin,
  postLogin
}