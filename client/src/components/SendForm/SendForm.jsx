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
    console.log(this.props.username,value)
    socket.emit('sendMsg',{'name':this.props.username,'msg':value,'date':new Date(), 'socketID':socket.id})
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
