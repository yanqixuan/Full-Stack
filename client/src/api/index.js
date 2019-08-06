const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8080'
const apiGet = '/example/get'
const apiPost = '/example/post'
const apiLoginPost = '/login/post'
const apiLoginGet = '/login/get'

axios.defaults.timeout = 10000

// axios.interceptors.request.use(function(config) {

// }, function (error) {

// })

// axios.interceptors.response.use(function(response) {

// }, function (error) {
  
// })

export function getExample() {
  axios.get(apiGet).then(res => {
    console.log('1',res)
  })
}

export function postExample() {
  axios.post(apiPost)
}

export function loginPost(username, password){
  axios.post(apiLoginPost,{
    username,
    password
  }).then(res => {
    console.log(res)
  })
}

export function loginGet(username, password){
  return (axios.get(apiLoginGet,{
    params:{
      username,
      password
    }
  }).then(res => {
    if(res.data.data.result.length >0){
      alert('登录成功')
      return res.data.data.result[0]
      // console.log(res.data.data.result[0])
    } else {
      alert('用户名或密码错误')
    }
  }))
  
  
}