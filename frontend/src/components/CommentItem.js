import React, { Component } from 'react'
import { Comment, Grid, Statistic, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import dateformat from 'dateformat'

import CommentModal from './CommentModal'
import './App.css'

class CommentItem extends Component {
  handleVote = (e, { icon }) => {
    const { comment, voteComment } = this.props
    if (icon === 'thumbs down') {
      voteComment(comment, 'downVote')
    } else {
      voteComment(comment, 'upVote')
    }
  }

  handleDelete = e => {
    this.props.deleteComment(this.props.comment)
  }

  render() {
    const { comment } = this.props
    return (
      <Grid>
        <Grid.Column width={3} textAlign='center'>
          <Grid.Column width={3}>
            <Statistic size='tiny'>
              <Statistic.Value>{comment.voteScore}</Statistic.Value>
            </Statistic>
          </Grid.Column>
          <Grid.Column width={1} style={{float: 'left'}}>
            <Button inverted color='red' icon='thumbs down' size='tiny'
              onClick={this.handleVote}/>
          </Grid.Column>
          <Grid.Column width={1} style={{float: 'right'}}>
            <Button inverted color='green' icon='thumbs up' size='tiny'
              onClick={this.handleVote}/>
          </Grid.Column>
        </Grid.Column>
        <Grid.Column width={13}>
          <Comment>
            <Comment.Content>
              <Comment.Author as='a'>{comment.author}</Comment.Author>
              <Comment.Metadata>
              <div>{dateformat(comment.timestamp)}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
              <Comment.Actions>
                <CommentModal isEdit={true} comment={comment}/>
                <a className='custom-link' onClick={this.handleDelete}>
                  Delete
                </a>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default CommentItem
