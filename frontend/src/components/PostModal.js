import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal, Icon } from 'semantic-ui-react'

import { addPost, editPost, setUsername } from '../actions'
import { generateId } from '../utils/id'
import './App.css'

class PostModal extends Component {

  state = {
    author: '',
    username: this.props.username,
    category: '',
    title: '',
    body: '',
    open: false,
  }

  componentDidMount() {
    const { username, isEdit, post } = this.props
    if (isEdit) {
      this.setState({
        author: post.author,
        category: post.category,
        title: post.title,
        body: post.body,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.username !== nextProps.username) {
      this.setState({username: nextProps.username})
    }
  }

  handleChange = (e, { name, value }) => this.setState({[name]: value})

  handleSubmit = () => {
    const { username, author, category, title, body } = this.state
    const { isEdit, addPost, setUsername, editPost, post } = this.props
    setUsername(username)
    const newPost = {
      id: isEdit ? post.id : generateId(),
      timestamp: Date.now(),
      author: isEdit ? author : username,
      voteScore: 0,
      deleted: false,
      title,
      body,
      category
    }
    isEdit ? editPost(newPost) : addPost(newPost)
    this.setState({
      category: '',
      title: '',
      body: '',
      open: false
    })
  }

  handleOpen = e => {
    this.setState({open: true})
  }

  render() {
    const { open, username, category, title, body } = this.state
    const { categories, isEdit, post } = this.props
    return (
      <Modal open={open} onClose={() => this.setState({open: false})}
        trigger={
          isEdit ?
          <a className='custom-link' onClick={this.handleOpen}>Edit</a> :
          <Button onClick={this.handleOpen}>
            <Icon name='plus'/>ADD POST
          </Button>
        }
      >
        <Modal.Header>
          {
            isEdit ? 'Edit Post' : 'Add Post'
          }
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input disabled={isEdit} label='Author' placeholder='Enter a username'
                name='username' value={isEdit ? post.author : username} onChange={this.handleChange}
              />
              <Form.Select disabled={isEdit} label='Category' options={categories} placeholder='Select a category'
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
  editPost: post => dispatch(editPost(post)),
  setUsername: username => dispatch(setUsername(username))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostModal)
