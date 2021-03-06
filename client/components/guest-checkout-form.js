import React from 'react'
import {connect} from 'react-redux'
import {guestCheckout} from '../store/guest'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

class GuestCheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      checkedOut: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.checkout(this.state)
    this.setState({
      firstName: '',
      lastName: '',
      address: '',
      checkedOut: true
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={evt => this.handleChange(evt)}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={evt => this.handleChange(evt)}
          />
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={this.state.address}
            onChange={evt => this.handleChange(evt)}
          />
          <Button
            type="submit"
            variant="light"
            size="sm"
            disabled={
              !this.state.firstName ||
              !this.state.lastName ||
              !this.state.address
            }
          >
            Place Order
          </Button>
          <div>
            {this.state.checkedOut && (
              <Alert variant="success">
                You have successfully checked out! Enjoy your new friends
              </Alert>
            )}
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  checkout: obj => dispatch(guestCheckout(obj))
})
export default connect(null, mapDispatch)(GuestCheckoutForm)
