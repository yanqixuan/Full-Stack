const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8080'
const api = '/example/get'

export default function getExample() {
  axios.get(api).then(res => {
    console.log(res)
  })
}

// export {
//   getExample
// } 