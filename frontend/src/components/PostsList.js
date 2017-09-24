import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Item, Icon } from 'semantic-ui-react'
import dateformat from 'dateformat'

class PostsList extends Component {
  render() {
    const { posts } = this.props
    return (
      <Item.Group>
        {
          posts
            ? posts.map(post => (
              <Item key={post.id}>
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
            ))
            : ''
        }
      </Item.Group>
    )
  }
}

const mapStateToProps = ({ postsReducer }) => ({
  posts: postsReducer.posts
})

export default connect(
  mapStateToProps
)(PostsList)
