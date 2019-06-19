import React from 'react'
import {connect} from 'react-redux'
import {completeOrderThunk} from '../store/orders'
import {me} from '../store/user'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

import {Payment} from './payment'

class CheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: ''
    }
  }
  async componentDidMount() {
    await this.props.me()
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
        <Payment />
        <Button
          type="button"
          variant="light"
          size="sm"
          disabled={
            !this.state.firstName || !this.state.lastName || !this.state.address
          }
          onClick={() => {
            this.props.completeOrder(this.state, this.props.user.id)
            this.props.history.push('/ordersrecent')
            this.setState({
              firstName: '',
              lastName: '',
              address: ''
            })
          }}
        >
          Place Order
        </Button>
      </div>
    )
  }
}
const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  completeOrder: (info, id) => dispatch(completeOrderThunk(info, id)),
  me: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(CheckoutForm)
