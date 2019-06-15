import React from 'react'
import {connect} from 'react-redux'

class GuestCart extends React.Component {
  render() {
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
                  <td>{JSON.parse(friend).price}</td>
                  <td>
                    <button type="button" className="deleteButton">
                      x
                    </button>
                  </td>
                </tr>
              ))
            )}
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
