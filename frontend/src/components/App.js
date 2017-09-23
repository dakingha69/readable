import React, { Component } from 'react'
import { connect } from 'react-redux'
import MenuInverted from './MenuInverted'
import Categories from './Categories'
import { fetchCategories } from '../actions'
import './App.css'

class App extends Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <div className="App">
        <MenuInverted />
        <Categories />
        <div>hello</div>
      </div>
    )
  }
}

const mapStateToProps = ({ categoriesReducer }) => ({
  categories: categoriesReducer.categories
})

const mapDispatchToProps = dispatch =>  ({
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
