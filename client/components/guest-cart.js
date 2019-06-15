import React from 'react'
import {connect} from 'react-redux'

class GuestCart extends React.Component {
  render() {
    let total = this.props.guestCart.reduce((accum, curr) => {
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
            {!this.props.guestCart ? (
              <div>[]</div>
            ) : (
              this.props.guestCart.map(friend => (
                <tr key={JSON.parse(friend).id}>
                  <td>{JSON.parse(friend).name}</td>
                  <td>1</td>
                  <td>{1 * JSON.parse(friend).price}</td>
                  <td>
                    <button type="button" className="deleteButton">
                      x
                    </button>
                  </td>
                </tr>
              ))
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
            <button type="button">CheckOut as Guest</button>
          </div>
          <div>
            <button
              type="button"
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
  guestCart: state.orders.guestCart
})

export default connect(mapState, null)(GuestCart)
