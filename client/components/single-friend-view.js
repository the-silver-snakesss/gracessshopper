import React from 'react'
import {connect} from 'react-redux'
import {getFriend} from '../store/friends'
import {addAFriendThunk, addGuestThunk} from '../store/orders'
import {me} from '../store/user'
import SingleFriend from './single-friend'
class SingleFriendView extends React.Component {
  constructor() {
    super()
    this.state = {
      itemsArray: []
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    const friendId = Number(this.props.match.params.id)
    this.props.getFriend(friendId)
    this.props.me()
    if (!localStorage.cart) {
      localStorage.setItem('cart', [])
    }
  }
  async handleClick() {
    let data = JSON.stringify(this.props.selectedFriend)
    await this.setState(prevState => ({
      itemsArray: [...prevState.itemsArray, data]
    }))

    await this.props.addtoCartAsGuest(
      this.props.selectedFriend,
      this.state.itemsArray
    )
  }
  render() {
    let guestID = 0
    const {
      image,
      name,
      price,
      likes,
      description,
      activities
    } = this.props.selectedFriend

    return (
      <div>
        <h1>This is the single friend view</h1>
        <img src={image} />
        <h3>{name}</h3>
        <h4>price: ${price}</h4>
        <h4>likes: {likes}</h4>
        <h4>description: {description}</h4>
        <h4>activities: {activities}</h4>
        {this.props.user.id ? (
          <button
            type="button"
            onClick={() =>
              this.props.addtoCart(
                this.props.user.id,
                this.props.selectedFriend
              )
            }
          >
            Add to cart!
          </button>
        ) : (
          <button type="button" onClick={() => this.handleClick()}>
            Add to cart!
          </button>
        )}
        <div>
          <button
            type="button"
            onClick={() => {
              this.props.history.push('/all')
            }}
          >
            {' '}
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  selectedFriend: state.friends.selectedFriend,
  user: state.user,
  guestCart: state.guestCart
})
const mapDispatchToProps = dispatch => ({
  getFriend: id => dispatch(getFriend(id)),
  addtoCart: (id, obj) => dispatch(addAFriendThunk(id, obj)),
  me: () => dispatch(me()),
  addtoCartAsGuest: (id, obj) => dispatch(addGuestThunk(id, obj))
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleFriendView)
