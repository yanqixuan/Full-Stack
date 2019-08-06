const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username:{
    type:String,
    required:true //非空
  },
  password:{
    type:String,
    required:true
  }
},{collection:'user'})

module.exports = mongoose.model('user',userSchema);