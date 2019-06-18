import React from 'react'
import {connect} from 'react-redux'
import {removeCartItem} from '../store/guest'
import Button from 'react-bootstrap/Button'

class GuestCart extends React.Component {
  render() {
    let total = this.props.guest.reduce((accum, curr) => {
      return accum + JSON.parse(curr).price * 1
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
            {!this.props.guest ? (
              <div />
            ) : (
              this.props.guest.map(friend => {
                friend = JSON.parse(friend)
                return (
                  <tr key={friend.id}>
                    <td>{friend.name}</td>
                    <td>1</td>
                    <td>${1 * friend.price}</td>
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
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => {
                this.props.history.push('/guest_checkout')
              }}
            >
              CheckOut as Guest
            </Button>
          </div>
          <div>
            <Button
              type="button"
              variant="light"
              size="sm"
              onClick={() => {
                this.props.history.push('/signup')
              }}
            >
              Sign Up
            </Button>
          </div>
          <div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                this.props.history.push('/all')
              }}
            >
              Continue Shopping
            </Button>
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
  remove: friendId => dispatch(removeCartItem(friendId))
})

export default connect(mapState, mapDispatch)(GuestCart)
