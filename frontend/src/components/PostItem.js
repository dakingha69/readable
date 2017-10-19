import React, { Component } from 'react'
import { Item, Statistic, Button, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import dateformat from 'dateformat'

import PostModal from './PostModal'
import './App.css'

class PostItem extends Component {
  handleVote = (e, { icon }) => {
    const { post, votePost, selectedCategory } = this.props
    if (icon === 'thumbs down') {
      votePost(post, 'downVote', selectedCategory)
    } else {
      votePost(post, 'upVote', selectedCategory)
    }
  }

  handleDelete = e => {
    this.props.deletePost(this.props.post)
  }

  render() {
    const { post } = this.props
    return (
      <Item key={post.id}>
        <Item.Image size='small'>
          <Grid columns={1}>
            <Grid.Row className='no-padding-bottom'>
              <Grid.Column textAlign='center'>
                <Statistic size='small'>
                  <Statistic.Value>{post.voteScore}</Statistic.Value>
                </Statistic>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} className='no-padding-top'>
              <Grid.Column textAlign='right'>
                <Button inverted color='red' icon='thumbs down'
                  onClick={this.handleVote}/>
              </Grid.Column>
              <Grid.Column>
                <Button inverted color='green' icon='thumbs up'
                  onClick={this.handleVote}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Item.Image>
        <Item.Content>
          <Item.Header as={Link} to={`/${post.category}/${post.id}`}>
            {post.title}
          </Item.Header>
          <Item.Meta>
            posted by <strong>{post.author}</strong>
            on <strong>{dateformat(post.timestamp)}</strong>
          </Item.Meta>
          <Item.Description>{post.body}</Item.Description>
          <Item.Extra>
            <Link to={`/${post.category}/${post.id}`} className='custom-link'>
              Comments({post.comments.length})
            </Link>
            <PostModal isEdit={true} post={post}/>
            <a className='custom-link' onClick={this.handleDelete}>
              Delete
            </a>
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

export default PostItem
