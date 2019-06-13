import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/orders'
import {me} from '../store/user'

class CartView extends React.Component {
  async componentDidMount() {
    await this.props.me()
    await this.props.getCartThunk(this.props.user.id)
  }

  render() {
    if (this.props.loading) {
      return <div>loading...</div>
    }
    let total = this.props.cart.reduce((accum, curr) => {
      return accum + curr.price * curr.order_friends.quantity
    }, 0)
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map(friend => (
              <tr key={friend.id}>
                <td>{friend.name}</td>
                <td>{friend.order_friends.quantity}</td>
                <td>{friend.order_friends.quantity * friend.price}</td>
                <td>
                  <button type="button">x</button>
                </td>
              </tr>
            ))}
          </tbody>
          <hr />
          <tbody>
            <tr>
              <td>Total:</td>
              <td />
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
        <button type="button">Chickity-CheckOut</button>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.orders.cart,
  user: state.user,
  loading: state.orders.loading
})

const mapDispatch = dispatch => ({
  getCartThunk: userId => dispatch(getCartThunk(userId)),
  me: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(CartView)
