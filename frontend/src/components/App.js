import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import MenuInverted from './MenuInverted'
import Categories from './Categories'
import PostsList from './PostsList'
import { fetchCategories, fetchPosts, getUsername } from '../actions'
import './App.css'

class App extends Component {

  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPosts()
    this.props.getUsername()
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <MenuInverted />
        <Categories />
        <Container>
          <PostsList />
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ categoriesReducer, postsReducer }) => ({
  categories: categoriesReducer.categories,
  posts: postsReducer.posts,
  fetching: postsReducer.fetching
})

const mapDispatchToProps = dispatch =>  ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts()),
  getUsername: () => dispatch(getUsername())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
