import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Header, Modal, Icon, Input } from 'semantic-ui-react'

import UserModal from './UserModal'
import { addPost, setUsername } from '../actions'

class PostModal extends Component {

  state = {
    username: '',
    valid: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.username !== nextProps.username) {
      this.setState({username: nextProps.username})
    }
  }

  handleChange = (e, data) => {
    this.setState({username: data.value})
  }

  handleAddPost = post => {

  }

  render() {
    const { categories } = this.props
    return (
      <Modal trigger={<Button><Icon name='plus'/>ADD POST</Button>}>
        <Modal.Header>
          Add Post
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Author</label>
                <Input fluid placeholder='Enter a username' value={this.state.username} onChange={this.handleChange} />
              </Form.Field>
              <Form.Select label='Category' options={categories} placeholder='Select a category' />
            </Form.Group>
            <Form.Input label='Title' placeholder='Enter a title' />
            <Form.TextArea label='Body' placeholder='What do you want to tell the world?' />
            <Form.Button>Submit</Form.Button>
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
