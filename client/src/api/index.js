const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8080'
const apiGet = '/example/get'
const apiPost = '/example/post'
const apiRegister = '/register/post'
const apiLoginPost = '/login/post'

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

export function registerPost(username, password){
  axios.post(apiRegister,{
    username,
    password
  }).then(res => {
    console.log(res)
  })
}

export function loginGet(username, password){
  return (axios.post(apiLoginPost,{
      username,
      password
  }).then(res => {
    console.log(res)
    localStorage.clear();
    localStorage.setItem('user_token',res.data.data.token)
    if(res.data.data.result.length >0){
      alert('登录成功')
      return res.data.data.result[0]
      // console.log(res.data.data.result[0])
    } else {
      alert('用户名或密码错误')
    }
  }))
  
  
}