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
    if (this.props.loading) {
      return <div>loading...</div>
    }

    return (
      <div>
        <h1>Your Past Orders</h1>
        {this.props.orders.map(order => {
          let total = order.friends.reduce((accum, curr) => {
            return accum + curr.price * curr.order_friends.quantity
          }, 0)
          return (
            <div key={order.id}>
              <p>Order Number:</p>
              <p>{order.id}</p>
              <p>Order Address:</p>
              <p>{order.address}</p>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.friends.map(friend => (
                    <tr key={friend.id}>
                      <td>{friend.name}</td>
                      <td>{friend.order_friends.quantity}</td>
                      <td>{friend.order_friends.quantity * friend.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>Total:</p>
              <p>{total}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  orders: state.orders.orders,
  user: state.user,
  loading: state.orders.loading
})

const mapDispatch = dispatch => ({
  getOrders: userId => dispatch(getOrdersThunk(userId)),
  me: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(YourOrders)
