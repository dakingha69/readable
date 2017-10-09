import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Modal, Icon, Input } from 'semantic-ui-react'

import { setUsername, getUsername } from '../actions'

class UserModal extends Component {

  state = {
    username: '',
    open: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.username !== nextProps.username) {
      this.setState({username: nextProps.username})
    }
  }

  handleSetUsername = () => {
    this.props.setUsername(this.state.username)
    this.setState({open: false})
  }

  handleChange = (e, data) => {
    this.setState({username: data.value})
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  render() {
    const { username } = this.props
    return (
      <Modal basic size='small' open={this.state.open} onClose={() => this.setState({open: false})}
        trigger={
          <Button onClick={this.handleOpen}>
            <Icon name='user' />{username ? username : 'SET USERNAME'}
          </Button>
        }
      >
        <Header icon='user' content='Set a username' />
        <Modal.Content>
          <Input fluid placeholder='Enter a username' value={this.state.username} onChange={this.handleChange} />
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' inverted onClick={() => this.setState({open: false})}>
            <Icon name='cancel' /> Cancel
          </Button>
          <Button color='green' inverted onClick={this.handleSetUsername}>
            <Icon name='save' /> Save
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = ({ userReducer }) => ({
  username: userReducer.username
})

const mapDispatchToProps = dispatch =>  ({
  setUsername: username => dispatch(setUsername(username)),
  getUsername: () => dispatch(getUsername())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserModal)
