import React from 'react'
import {connect} from 'react-redux'
import {CONNREFUSED} from 'dns'

class GuestCart extends React.Component {
  render() {
    // let guestCart = this.props.guestCart
    // console.log(guestCart)

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
            <tr>
              <td>Total:</td>
              <td />
              <td>{}</td>
            </tr>
          </tbody>
        </table>
        <button type="button">Chickity-CheckOut</button>
      </div>
    )
  }
}
const mapState = state => ({
  guestCart: state.orders.guestCart
})

export default connect(mapState, null)(GuestCart)
