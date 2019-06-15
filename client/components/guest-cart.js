import React from 'react'
import {connect} from 'react-redux'

class GuestCart extends React.Component {
  componentDidUpdate(prevProps) {
    // was hoping this would trigger a update for us. I was trying to find more examples but I think this might work.
    if (prevProps.guest !== this.props.guest) {
      console.log(this.props.guest, 'this is your component')
    }
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
              this.props.guest.map(friend => (
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

export default connect(mapState, null)(GuestCart)
