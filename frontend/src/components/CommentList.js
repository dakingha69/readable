import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Comment, Header } from 'semantic-ui-react'

import CommentItem from './CommentItem'
import { votePost } from '../actions'
import './App.css'

class CommentList extends Component {
  render() {
    const { comments } = this.props
    const sortedComments = comments ? comments.sort((a, b) => b.timestamp - a.timestamp) : []
    return (
      <Comment.Group>
        <Header as='h3' dividing>Comments</Header>
        {
          sortedComments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        }
      </Comment.Group>
    )
  }
}

const mapStateToProps = ({ postsReducer }) => ({
  posts: postsReducer.posts
})

// const mapDispatchToProps = dispatch => ({
//   voteComment: (post, vote, category) => dispatch(votePost(post, vote, category))
// })

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(CommentList)
