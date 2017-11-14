import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Label, Grid, Statistic, Button } from 'semantic-ui-react'
import dateformat from 'dateformat'

import PostModal from './PostModal'
import MenuInverted from './MenuInverted'
import CommentList from './CommentList'
import {
  fetchCategories,
  fetchPosts,
  getUsername,
  votePost,
  deletePost
} from '../actions'
import { getColor } from '../utils/category'
import './App.css'

class PostDetail extends Component {
  state = {
    post: ''
  }

  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPosts()
    this.props.getUsername()
  }

  componentWillReceiveProps(nextProps) {
    const { posts, match } = this.props
    if (posts !== nextProps.posts) {
      this.setState({
        post: nextProps.posts.filter(p => p.id === match.params.id)[0]
      })
    }
  }

  handleVote = (e, { icon }) => {
    const { votePost } = this.props
    const { post } = this.state
    if (icon === 'thumbs down') {
      votePost(post, 'downVote', 'all')
    } else {
      votePost(post, 'upVote', 'all')
    }
  }

  handleDeletePost = e => {
    this.props.deletePost(this.state.post)
    this.props.history.push('/')
  }

  render() {
    const { post } = this.state
    return (
      <div className="App">
        {
          post ?
          <div>
            <MenuInverted isDetail={true} postId={post.id} />
            <Container>
              <Grid>
                <Grid.Column width={3} textAlign='center'>
                  <Grid.Column width={1} className='no-padding-bottom' textAlign='center'>
                    <Statistic size='small'>
                      <Statistic.Value>{post.voteScore}</Statistic.Value>
                    </Statistic>
                  </Grid.Column>
                  <Grid.Column className='no-padding-top' style={{float: 'left'}}>
                    <Button inverted color='red' icon='thumbs down'
                      onClick={this.handleVote}/>
                  </Grid.Column>
                  <Grid.Column style={{float: 'right'}}>
                    <Button inverted color='green' icon='thumbs up'
                      onClick={this.handleVote}/>
                  </Grid.Column>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Header as='h1'>{post.title}</Header>
                  <Header.Subheader>
                    posted by <strong>{post.author}</strong>&nbsp;
                    on <strong>{dateformat(post.timestamp)}</strong>&nbsp;
                    in <Label as='a' tag color={getColor(post.category)}>{post.category}</Label>
                  </Header.Subheader>
                  <p style={{fontSize: '18px', marginTop: '10px'}}>{post.body}</p>
                  <PostModal isEdit={true} post={post} />
                  <a className='custom-link' onClick={this.handleDeletePost}>
                    &nbsp;Delete
                  </a>
                </Grid.Column>
              </Grid>
              <CommentList comments={post.comments ? post.comments : []} />
            </Container>
          </div> :
          <div>
            <MenuInverted isDetail={true} noComment={true}/>
            <Container>
              Sorry there is no post with such id. Click <a href="/">here</a> to return
            </Container>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ categoriesReducer, postsReducer }) => ({
  posts: postsReducer.posts,
  fetching: postsReducer.fetching
})

const mapDispatchToProps = dispatch =>  ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts()),
  getUsername: () => dispatch(getUsername()),
  votePost: (post, vote, category) => dispatch(votePost(post, vote, category)),
  deletePost: post => dispatch(deletePost(post))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
