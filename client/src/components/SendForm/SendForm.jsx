import React, { Component } from 'react'
import { Input,Button } from 'antd';
import socket from '../../socket'
import './SendForm.styl'
const { TextArea } = Input;

export class SendForm extends Component {
  state = ({
    value:''
  })
  handleChange(e){
    this.setState({
      value:e.target.value
    })
    // console.log(this.state.value)
  }
  sumbit(){
    const value = this.state.value;
    console.log(value)
    socket.emit('sendMsg',{'id':'AA','msg':value,'date':new Date()})
    this.setState({
      value:''
    })
  }
  render() { 
    return (
      <div className='SendForm-content'>
        <TextArea rows={4} value={this.state.value} onChange={(e) => {this.handleChange(e)}} />

        <Button onClick={() => {this.sumbit()}} > 发送 </Button>
      </div>
    )
  }
}

export default SendForm
