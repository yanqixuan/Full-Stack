import React, { Component } from 'react'
import { SendForm } from '../SendForm/SendForm'
import socket from '../../socket'

export class Message extends Component {
  state = {
    message:[
    ],
    username:''
  }
  componentDidMount () {
    console.log(this.props.location.query.name)
    this.setState({
      username:this.props.location.query.name
    })
    console.log('message',socket)
    socket.on('receiveMsg',data => {
      console.log(data)
      let message = this.state.message;
      message.push({ id:data.id,msg:data.msg,date:data.date })
      this.setState({
        msg:data.msg,
      })
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
