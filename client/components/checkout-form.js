import React from 'react'

class CheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: ''
    }
  }
  render() {
    return (
      <div>
        <form>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={evt => this.setState({firstName: evt.target.value})}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={evt => this.setState({lastName: evt.target.value})}
          />
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={this.state.address}
            onChange={evt => this.setState({address: evt.target.value})}
          />
        </form>
      </div>
    )
  }
}
export default CheckoutForm
