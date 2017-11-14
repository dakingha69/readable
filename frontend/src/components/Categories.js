import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { fetchPosts } from '../actions'

const labelColors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown']

class Categories extends Component {
  state = {
    active: this.props.category
  }

  componentDidMount() {
    this.changeCategory(this.state.active)
  }

  handleCategoryClick = (e, { children }) => {
    this.changeCategory(children)
  }

  changeCategory = (category) => {
    this.setState({active: category})
    this.props.fetchPosts(category === 'all' ? '' : category)
  }

  render() {
    const { categories } = this.props
    return (
      <div style={{marginBottom: '25px'}}>
        <Label size='large' tag
          as={Link} to={`/`}
          active={this.state.active === 'all'}
          color='black'
          onClick={this.handleCategoryClick}
        >
          all
        </Label>
        {categories && categories.map((category, i) => (
          <Label size='large' tag key={i}
            as={Link} to={`/${category.name}`}
            active={this.state.active === category.name}
            color={labelColors[i]}
            onClick={this.handleCategoryClick}
          >
            {category.name}
          </Label>
          )
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ categoriesReducer }) => ({
  categories: categoriesReducer.categories,
  selectedCategory: categoriesReducer.category
})

const mapDispatchToProps = dispatch =>  ({
  fetchPosts: category => dispatch(fetchPosts(category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)
