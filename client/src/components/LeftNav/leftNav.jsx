import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class leftNav extends Component {
  render() {
    return (
      <div>
        <NavLink to={this.props.path}>
          <span>{this.props.img}</span>
        </NavLink>
      </div>
    )
  }
}

export default leftNav
