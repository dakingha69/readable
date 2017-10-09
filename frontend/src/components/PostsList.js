import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Item } from 'semantic-ui-react'

import PostItem from './PostItem'
import { votePost } from '../actions'
import './App.css'

class PostsList extends Component {
  render() {
    const { posts, sort } = this.props
    const sortedPosts = posts ? posts.sort((a, b) => {
      if (sort === 'topRated') {
        return b.voteScore - a.voteScore
      } else if (sort === 'mostRecent') {
        return b.timestamp - a.timestamp
      } else {
        return posts
      }
    }) : []
    return (
      <Item.Group>
        {
          sortedPosts.map(post => (
            <PostItem
              key={post.id}
              post={post}
              votePost={this.props.votePost}
              selectedCategory={this.props.selectedCategory}
            />
          ))
        }
      </Item.Group>
    )
  }
}

const mapStateToProps = ({ postsReducer }) => ({
  posts: postsReducer.posts,
  sort: postsReducer.sort,
  selectedCategory: postsReducer.category
})

const mapDispatchToProps = dispatch => ({
  votePost: (post, vote, category) => dispatch(votePost(post, vote, category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)
