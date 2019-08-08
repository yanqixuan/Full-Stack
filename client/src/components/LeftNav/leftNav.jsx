import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './leftNav.styl'

export class leftNav extends Component {
  render() {
    return (
      <div className='left-item'>
        <NavLink to={this.props.path}>
          <img src={require('../../img/'+this.props.img+'.png')} alt=""/>
        </NavLink>
      </div>
    )
  }
}

export default leftNav
