import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Header, Modal, Icon, Input } from 'semantic-ui-react'

import UserModal from './UserModal'
import { addPost, setUsername } from '../actions'
import { generateId } from '../utils/id'

class PostModal extends Component {

  state = {
    username: this.props.username,
    category: '',
    title: '',
    body: '',
    open: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.username !== nextProps.username) {
      this.setState({username: nextProps.username})
    }
  }

  handleChange = (e, { name, value }) => this.setState({[name]: value})

  handleSubmit = () => {
    const { username, category, title, body } = this.state
    this.props.setUsername(this.state.username)
    const post = {
      id: generateId(),
      timestamp: Date.now(),
      author: username,
      voteScore: 0,
      deleted: false,
      title,
      body,
      category
    }
    this.props.addPost(post)
    this.setState({
      category: '',
      title: '',
      body: '',
      open: false
    })
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  render() {
    const { open, username, category, title, body } = this.state
    const { categories } = this.props
    return (
      <Modal open={open} onClose={() => this.setState({open: false})}
        trigger={
          <Button onClick={this.handleOpen}>
            <Icon name='plus'/>ADD POST
          </Button>
        }
      >
        <Modal.Header>
          Add Post
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input label='Author' placeholder='Enter a username'
                name='username' value={username} onChange={this.handleChange}
              />
              <Form.Select label='Category' options={categories} placeholder='Select a category'
                name='category' value={category} onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Input label='Title' placeholder='Enter a title'
              name='title' value={title} onChange={this.handleChange}
            />
            <Form.TextArea label='Body' placeholder='What do you want to tell the world?'
              name='body' value={body} onChange={this.handleChange}
            />
            <Form.Button>Post</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = ({ categoriesReducer, userReducer }) => ({
  categories: categoriesReducer.categories ? categoriesReducer.categories.map(category => ({
    key: category.name,
    value: category.name,
    text: category.name
  })) : [],
  username: userReducer.username
})

const mapDispatchToProps = dispatch =>  ({
  addPost: post => dispatch(addPost(post)),
  setUsername: username => dispatch(setUsername(username))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostModal)
