import React from 'react'
import {connect} from 'react-redux'
import {guestCheckout} from '../store/guest'

class GuestCheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: ''
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
    console.log('handling submit')
    evt.preventDefault()
    this.props.checkout(this.state)
    this.setState({
      firstName: '',
      lastName: '',
      address: ''
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
          <button type="submit">Place Order</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  checkout: () => dispatch(guestCheckout())
})
export default connect(null, mapDispatch)(GuestCheckoutForm)
