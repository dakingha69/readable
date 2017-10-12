import React, { Component } from 'react'
import { Comment, Grid, Statistic, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import dateformat from 'dateformat'

import './App.css'

class CommentItem extends Component {
  render() {
    const { comment } = this.props
    console.log(comment)
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
                <Comment.Action>Edit</Comment.Action>
                <Comment.Action>Delete</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default CommentItem
