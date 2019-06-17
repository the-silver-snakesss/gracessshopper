import React from 'react'
import {connect} from 'react-redux'
import {removeCartItem, editQuantity} from '../store/guest'

class GuestCart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt, friendId) {
    let qty = evt.target.value
    this.props.editQty(friendId, qty)
  }

  render() {
    let total = this.props.guest.reduce((accum, curr) => {
      return accum + JSON.parse(curr).price * 1
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
            {!this.props.guest ? (
              <div />
            ) : (
              this.props.guest.map(friend => {
                friend = JSON.parse(friend)
                return (
                  <tr key={friend.id}>
                    <td>{friend.name}</td>
                    <td>
                      <input
                        type="number"
                        name="quantity"
                        className="quantity"
                        value={friend.quantity}
                        onChange={(evt, friendId = friend.id) =>
                          this.handleChange(evt, friendId)
                        }
                      />
                    </td>
                    <td>{1 * friend.price}</td>
                    <td>
                      <button
                        type="button"
                        className="deleteButton"
                        onClick={() => this.props.remove(friend.id)}
                      >
                        x
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
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
        <div className="buttons-container">
          <div>
            <button
              type="button"
              onClick={() => {
                this.props.history.push('/guest_checkout')
              }}
            >
              CheckOut as Guest
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                this.props.history.push('/signup')
              }}
            >
              Sign Up
            </button>
          </div>
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
  guest: state.guest
})

const mapDispatch = dispatch => ({
  remove: friendId => dispatch(removeCartItem(friendId)),
  editQty: (friendId, qty) => dispatch(editQuantity(friendId, qty))
})

export default connect(mapState, mapDispatch)(GuestCart)
