import React, { Component } from 'react'
import { SendForm } from '../SendForm/SendForm'
import io from 'socket.io-client'

export class Message extends Component {
  state = {
    id:'AA',
    msg:''
  }
  componentDidMount () {
    const socket = io("ws://localhost:8080")
    console.log('message',socket)
    socket.emit('sendMsg',{'id':this.state.id,'msg':'AA的msg'})
    socket.on('receiveMsg',data => {
      console.log(data)
      this.setState({
        msg:data.msg
      })
    })
  }
  render() {
    return (
      <div>
        message
        {this.state.msg}
        <SendForm />
      </div>
    )
  }
}

export default Message
