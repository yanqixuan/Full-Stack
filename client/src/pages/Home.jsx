import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LeftNav from '../components/LeftNav/leftNav'
import Collection from '../components/Collection/Collection'
import Message from '../components/Message/Message'
import People from '../components/People/People'

export class Home extends Component {
  state = {
    leftItems:[
      {
        id:1,
        path:'/home/message',
        img:'a'
      },
      {
        id:2,
        path:'/home/people',
        img:'b'
      },
      {
        id:3,
        path:'/home/collection',
        img:'c'
      }
    ]
  }
  render() {
    const leftSlide = this.state.leftItems.map((item) => {
      return (
        <div key={item.id}>
          <LeftNav path={item.path} img={item.img} />
        </div>
      )
    })
    return (
      <div>
        Home
        {leftSlide}
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
