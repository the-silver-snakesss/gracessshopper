import React from 'react'
import {connect} from 'react-redux'
import {getOrdersThunk} from '../store/orders'
import {me} from '../store/user'
import Button from 'react-bootstrap/Button'

class OrderPlaceView extends React.Component {
  async componentDidMount() {
    await this.props.me()
    await this.props.getOrders(this.props.user.id)
  }

  render() {
    // if(this.props.loading){
    //   return (<div>loading...</div>)
    // }
    const recentOrder = this.props.orders[this.props.orders.length - 1]
    return (
      <div>
        {this.props.loading ? (
          <h3>Loading....</h3>
        ) : (
          <div>
            <h1>Your Order Has been placed</h1>
            <h6>Order number:{recentOrder.id}</h6>
            <h6>
              Items:{' '}
              {recentOrder.friends.map(friend => (
                <ul key={friend.id}>
                  <li>
                    {friend.name} | Quantity: {friend.order_friends.quantity}
                  </li>
                </ul>
              ))}
            </h6>
            <div>
              <h6>Thank You for Shopping with us!</h6>
            </div>
            <div>
              <Button
                type="button"
                variant="light"
                size="sm"
                onClick={() => this.props.history.push('/home')}
              >
                Home
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders.orders,
  user: state.user,
  loading: state.orders.loading
})

const mapDispatchToProps = dispatch => ({
  getOrders: userId => dispatch(getOrdersThunk(userId)),
  me: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlaceView)
