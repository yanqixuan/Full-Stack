import React, { Component } from 'react'
import { SendForm } from '../SendForm/SendForm'
import socket from '../../socket'
const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8080'
const apiMessageGet = '/home/message'

export class Message extends Component {
  state = {
    message: [
    ],
    username: ''
  }
  componentDidMount() {
    const token = localStorage.getItem('user_token')
    console.log(localStorage)
    if (this.props.location.query) {
      this.setState({
        username: this.props.location.query.name
      })
    }

    // console.log('message', socket)
    socket.on('receiveMsg', data => {
      // console.log(data)
      let message = this.state.message;
      message.push({ id: data.id, msg: data.msg, date: data.date })
      this.setState({
        msg: data.msg,
      })
    })

    axios.get(apiMessageGet,{
      headers:{
        "authorization":"Bearer " + token
      },
      params:{
        token
      }
    }).then(res => {
      console.log(res)
    }).catch(err => { //说明token已失效
      localStorage.removeItem('user_token')
      alert('登录信息已失效，请重新登录')
      this.props.history.push({pathname:"/"});
      console.log(err)
    })
  }
  componentWillUnmount() {
    // this.setState = (state,callback) => {
    //   return ;
    // }
    socket.removeAllListeners();
  }
  render() {
    const msgList = this.state.message.map(item => {
      return (
        <div key={item.date}>
          {item.id} : {item.msg}
        </div>
      )
    })
    return (
      <div>
        message
        {msgList}
        <SendForm username={this.state.username} />
      </div>
    )
  }
}

export default Message
