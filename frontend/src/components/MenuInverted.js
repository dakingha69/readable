import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import PostModal from './PostModal'
import CommentModal from './CommentModal'
import UserModal from './UserModal'
import { fetchPosts, setSort } from '../actions'
import './App.css'

class MenuInverted extends Component {

  handleSort = (e, { name }) => {
    this.props.setSort(name)
  }

  getDisplay = (isDetail, noComment) => ({ display: isDetail || noComment ? 'none' : ''})

  render() {
    const { sort, isDetail, noComment } = this.props
    return (
      <Menu inverted size='large'>
        <Menu.Item as={Link} to='/'>Readable</Menu.Item>
        <Menu.Item className={sort === 'topRated' ? 'higlight-sort' : ''}
          style={this.getDisplay(isDetail)}
          name='topRated'
          onClick={this.handleSort}
        >
          <Icon name='star'/>TOP RATED
        </Menu.Item>
        <Menu.Item className={sort === 'mostRecent' ? 'higlight-sort' : ''}
          style={this.getDisplay(isDetail)}
          name='mostRecent'
          onClick={this.handleSort}
        >
          <Icon name='clock'/>MOST RECENT
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item style={this.getDisplay(isDetail)}>
            <PostModal />
          </Menu.Item>
          <Menu.Item style={this.getDisplay(!isDetail, noComment)}>
            <CommentModal parentId={this.props.postId}/>
          </Menu.Item>
          <Menu.Item><UserModal /></Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = ({ categoriesReducer, postsReducer }) => ({
  categories: categoriesReducer.categories,
  sort: postsReducer.sort
})

const mapDispatchToProps = dispatch =>  ({
  fetchPosts: category => dispatch(fetchPosts(category)),
  setSort: sort => dispatch(setSort(sort))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuInverted)
