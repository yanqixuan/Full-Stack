const exampleM = require('../models/exampleM');

const getExample = async (ctx, next) => {
  // console.log(1);
  const req = ctx.request.query;
  const example = await exampleM.find({});
  ctx.status = 200;
  ctx.body = {
    msg:'getExample',
    data:{
      data: req,
      example
    }
  }
}
const postExample = async (ctx, next) => {
  const req = ctx.request.body;
  ctx.status = 200;
  if(!req.msg || typeof req.msg != 'string'){
    ctx.status = 401;
    ctx.body = {
      msg: 'error',
      data:req
    }
    return;
  }
  const result = await exampleM.create({msg: req.msg});

  ctx.body = {
    msg:'post success insert success',
    data: result
  }
}

module.exports = {
  getExample,
  postExample
}