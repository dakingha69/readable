import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal, Icon } from 'semantic-ui-react'

import { addComment, editComment, setUsername } from '../actions'
import { generateId } from '../utils/id'

class CommentModal extends Component {

  state = {
    author: '',
    username: this.props.username,
    body: '',
    open: false,
  }

  componentDidMount() {
    const { username, isEdit, comment } = this.props
    if (isEdit) {
      this.setState({
        author: comment.author,
        body: comment.body,
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
    const { author, username, body } = this.state
    const { isEdit, comment, addComment, editComment } = this.props
    this.props.setUsername(this.state.username)
    const newComment = {
      id: isEdit ? comment.id : generateId(),
      timestamp: Date.now(),
      author: isEdit ? author : username,
      parentId: this.props.parentId,
      body
    }
    isEdit ? editComment(newComment) : addComment(newComment)
    this.setState({
      body: isEdit ? newComment.body : '',
      open: false
    })
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  render() {
    const { open, username, body } = this.state
    const { isEdit, comment } = this.props
    return (
      <Modal open={open} onClose={() => this.setState({open: false})}
        trigger={
          isEdit ?
          <a className='custom-link' onClick={this.handleOpen}>Edit</a> :
          <Button onClick={this.handleOpen}>
            <Icon name='plus'/>ADD COMMENT
          </Button>
        }
      >
        <Modal.Header>
          {
            isEdit ? 'Edit Comment' : 'Add Comment'
          }
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input disabled={isEdit} label='Author' placeholder='Enter a username'
                name='username' value={username} onChange={this.handleChange}
              />
            </Form.Group>
            <Form.TextArea label='Body' placeholder='What do you want to tell the world?'
              name='body' value={body} onChange={this.handleChange}
            />
            <Form.Button>Comment</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = ({ userReducer }) => ({
  username: userReducer.username
})

const mapDispatchToProps = dispatch =>  ({
  addComment: comment => dispatch(addComment(comment)),
  editComment: comment => dispatch(editComment(comment)),
  setUsername: username => dispatch(setUsername(username))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentModal)
