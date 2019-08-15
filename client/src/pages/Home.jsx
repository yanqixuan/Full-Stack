import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import LeftNav from '../components/LeftNav/leftNav'
import Collection from '../components/Collection/Collection'
import Message from '../components/Message/Message'
import People from '../components/People/People'
import io from 'socket.io-client'
import'./Home.styl'

export class Home extends Component {
  state = {
    username:'',
    active:1,
    leftItems:[
      {
        id:1,
        path:'/home/message',
        img:'message'
      },
      {
        id:2,
        path:'/home/people',
        img:'message'
      },
      {
        id:3,
        path:'/home/collection',
        img:'message'
      }
    ]
  }
  changeActive(id){
    this.setState({
      active:id
    })
  }
  componentWillMount(){
    
  }
  componentDidMount(){
    // console.log(this.props.location.query.username)
    // const socket = io('ws://localhost:8080')
    // socket.emit('send1','hello')
    // console.log( 'socket',socket)
    // socket.emit('sendToId',{"to":"id1","msg":"id1的消息"})
    this.setState({
      username:this.props.location.query.username
    })
  }
  render() {
    const leftSlide = this.state.leftItems.map((item) => {
      return (
        <div key={item.id} onClick={() => {this.changeActive(item.id)}} className={item.id === this.state.active ? 'active':''} >
          <LeftNav path={item.path} img={item.img} />
        </div>
      )
    })
    return (
      <div className='content'>
        Home
        <div className="left-container">
          {this.state.username}
          {leftSlide}
        </div>
        
        <div className="container">
              <Route path='/home/message' exact component={Message} />
              <Route path='/home/people' component={People} />
              <Route path='/home/collection' component={Collection} />
              <Route path='/home' exact component={Message} />
        </div>
      </div>
    )
  }
}

export default Home
