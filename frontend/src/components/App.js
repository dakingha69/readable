import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import MenuInverted from './MenuInverted'
import Categories from './Categories'
import PostsList from './PostsList'
import {
  fetchCategories,
  fetchPosts,
  getUsername
} from '../actions'
import './App.css'

class App extends Component {

  componentDidMount() {
    this.props.fetchCategories()
    this.props.getUsername()
  }

  render() {
    return (
      <div className="App">
        <MenuInverted />
        <Categories category={this.props.match.params.category ? this.props.match.params.category : 'all'} />
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
  getUsername: () => dispatch(getUsername())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
