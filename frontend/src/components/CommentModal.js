import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal, Icon } from 'semantic-ui-react'

import { addComment, setUsername } from '../actions'
import { generateId } from '../utils/id'

class CommentModal extends Component {

  state = {
    username: this.props.username,
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
    const { username, body } = this.state
    this.props.setUsername(this.state.username)
    const comment = {
      id: generateId(),
      timestamp: Date.now(),
      author: username,
      parentId: this.props.parentId,
      body
    }
    this.props.addComment(comment)
    this.setState({
      body: '',
      open: false
    })
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  render() {
    const { open, username, body } = this.state
    return (
      <Modal open={open} onClose={() => this.setState({open: false})}
        trigger={
          <Button onClick={this.handleOpen}>
            <Icon name='plus'/>ADD COMMENT
          </Button>
        }
      >
        <Modal.Header>
          Add Comment
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input label='Author' placeholder='Enter a username'
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
  setUsername: username => dispatch(setUsername(username))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentModal)
