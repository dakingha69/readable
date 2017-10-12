import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Comment, Header } from 'semantic-ui-react'

import CommentItem from './CommentItem'
import { voteComment } from '../actions'
import './App.css'

class CommentList extends Component {
  render() {
    const { comments } = this.props
    const sortedComments = comments ? comments.sort((a, b) => b.timestamp - a.timestamp) : []
    return (
      <Comment.Group>
        <Header as='h3' dividing>Comments ({comments.length})</Header>
        {
          sortedComments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              voteComment={this.props.voteComment}
            />
          ))
        }
      </Comment.Group>
    )
  }
}

const mapStateToProps = ({ postsReducer }) => ({
  posts: postsReducer.posts
})

const mapDispatchToProps = dispatch => ({
  voteComment: (comment, vote) => dispatch(voteComment(comment, vote))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList)
