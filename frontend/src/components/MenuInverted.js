import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown } from 'semantic-ui-react'

import { fetchPosts } from '../actions'

class MenuInverted extends Component {

  handleSort = (e, { name }) => console.log(name) // TODO sort posts

  render() {
    const { categories } = this.props
    return (
      <Menu inverted size='large'>
        <Menu.Item>Readable</Menu.Item>
        <Menu.Item name='topRated' onClick={this.handleSort}>
          TOP RATED
        </Menu.Item>
        <Menu.Item name='mostRecent' onClick={this.handleSort}>
          MOST RECENT
        </Menu.Item>
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
