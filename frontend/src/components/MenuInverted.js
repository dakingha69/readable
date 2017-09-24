import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown, Icon } from 'semantic-ui-react'

import PostModal from './PostModal'
import UserModal from './UserModal'
import { fetchPosts } from '../actions'

class MenuInverted extends Component {

  handleSort = (e, { name }) => console.log(name) // TODO sort posts

  render() {
    const { username } = this.props
    return (
      <Menu inverted size='large'>
        <Menu.Item>Readable</Menu.Item>
        <Menu.Item name='topRated' onClick={this.handleSort}>
          <Icon name='star'/>TOP RATED
        </Menu.Item>
        <Menu.Item name='mostRecent' onClick={this.handleSort}>
          <Icon name='clock'/>MOST RECENT
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item><PostModal /></Menu.Item>
          <Menu.Item><UserModal /></Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = ({ categoriesReducer }) => ({
  categories: categoriesReducer.categories
})

const mapDispatchToProps = dispatch =>  ({
  fetchPosts: category => dispatch(fetchPosts(category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuInverted)
