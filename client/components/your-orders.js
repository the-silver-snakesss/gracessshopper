import React from 'react'
import {connect} from 'react-redux'
import {getOrdersThunk} from '../store/orders'
import {me} from '../store/user'

class YourOrders extends React.Component {
  async componentDidMount() {
    await this.props.me()
    await this.props.getOrders(this.props.user.id)
  }

  render() {
    return (
      <div>
        <h1>This is where your orders will go</h1>
        <h2>{this.props.orders.id}</h2>
      </div>
    )
  }
}

const mapState = state => ({
  orders: state.orders.orders,
  user: state.user
})

const mapDispatch = dispatch => ({
  getOrders: userId => dispatch(getOrdersThunk(userId)),
  me: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(YourOrders)
