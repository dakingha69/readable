import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Item, Icon, Statistic, Grid, Button } from 'semantic-ui-react'
import dateformat from 'dateformat'

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
                        <Button inverted color='red' icon='thumbs down' />
                      </Grid.Column>
                      <Grid.Column>
                        <Button inverted color='green' icon='thumbs up' />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Item.Image>
                <Item.Content>
                  <Item.Header as='a'>{post.title}</Item.Header>
                  <Item.Meta>
                    posted by <strong>{post.author}</strong>
                    on <strong>{dateformat(post.timestamp)}</strong>
                  </Item.Meta>
                  <Item.Description>{post.body}</Item.Description>
                  <Item.Extra></Item.Extra>
                </Item.Content>
              </Item>
            )
          )
        }
      </Item.Group>
    )
  }
}

const mapStateToProps = ({ postsReducer }) => ({
  posts: postsReducer.posts,
  sort: postsReducer.sort
})

export default connect(
  mapStateToProps
)(PostsList)
