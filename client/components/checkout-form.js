import React from 'react'
import {connect} from 'react-redux'
import {completeOrderThunk} from '../store/orders'
import {me} from '../store/user'
import DropIn from 'braintree-web-drop-in-react'
import Axios from 'axios'

class CheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      payment: null
    }
  }
  async componentDidMount() {
    await this.props.me()
    const res = await Axios.get('/auth/pay/client_token')
    const clientToken = res.data
    console.log(res)
    this.setState({payment: clientToken})
  }
  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }
    //   return (
    //     <div>
    //       <div>

    //         <button type="submit"> Buy</button>
    //       </div>
    //     </div>
    //   )
    // }
    return (
      <div>
        <form>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={evt => this.setState({firstName: evt.target.value})}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={evt => this.setState({lastName: evt.target.value})}
          />
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={this.state.address}
            onChange={evt => this.setState({address: evt.target.value})}
          />
        </form>
        <div id="dropin-wrapper">
          <div id="checkout-message" />
          <div id="dropin-container" />
          <DropIn
            options={{authorization: this.state.payment}}
            //onInstance={instance => (this.instance = instance)}
          />
          <button id="submit-button">Submit payment</button>
        </div>
        <button
          type="button"
          disabled={
            !this.state.firstName || !this.state.lastName || !this.state.address
          }
          onClick={() => {
            this.props.completeOrder(this.state, this.props.user.id)
            this.setState({
              firstName: '',
              lastName: '',
              address: ''
            })
          }}
        >
          Complete Checkout
        </button>
      </div>
    )
  }
}
const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  completeOrder: (info, id) => dispatch(completeOrderThunk(info, id)),
  me: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(CheckoutForm)
