import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk, deleteFriendThunk} from '../store/orders'
import {me} from '../store/user'
import {Link} from 'react-router-dom'

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
    total = '$' + String(total).slice(0, 5)
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
                <td>${friend.order_friends.quantity * friend.price}</td>
                <td>
                  <button
                    type="button"
                    className="deleteButton"
                    onClick={() => {
                      this.props.delete(friend.order_friends.orderId, friend.id)
                    }}
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tbody>
            <tr>
              <td>Total:</td>
              <td />
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
        <div className="buttons-container">
          <button type="button">
            <Link to="/checkout">Chickity-CheckOut</Link>
          </button>
          <div>
            <button
              type="button"
              onClick={() => {
                this.props.history.push('/all')
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
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
  me: () => dispatch(me()),
  delete: (orderId, friendId) => dispatch(deleteFriendThunk(orderId, friendId))
})

export default connect(mapState, mapDispatch)(CartView)
