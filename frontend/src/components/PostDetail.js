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
  votePost
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

  render() {
    const { post } = this.state
    return (
      <div className="App">
        <MenuInverted isDetail={true} postId={post.id} />
        {
          post ?
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
                <p style={{color: 'grey'}}>
                  <PostModal isEdit={true} post={post} />
                </p>
              </Grid.Column>
            </Grid>
            <CommentList comments={post.comments ? post.comments : []} />
          </Container> :
          <div>Loading...</div>
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
  votePost: (post, vote, category) => dispatch(votePost(post, vote, category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
