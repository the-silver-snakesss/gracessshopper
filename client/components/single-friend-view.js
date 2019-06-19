import React from 'react'
import {connect} from 'react-redux'
import {getFriend} from '../store/friends'
import {addAFriendThunk} from '../store/orders'
import {addGuestThunk} from '../store/guest'
import {me} from '../store/user'
import Alert from 'react-bootstrap/Alert'

class SingleFriendView extends React.Component {
  constructor() {
    super()

    this.state = {
      isAdded: false
    }

    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    const friendId = Number(this.props.match.params.id)
    this.props.getFriend(friendId)
    this.props.me()
  }

  handleDismiss() {
    this.setState({
      isAdded: false
    })
  }

  async handleClick() {
    this.setState({
      isAdded: true
    })
    if (this.props.user.id) {
      await this.props.addtoCart(this.props.user.id, this.props.selectedFriend)
    } else {
      await this.props.addtoCartAsGuest(this.props.selectedFriend)
    }
  }
  render() {
    const {
      image,
      name,
      price,
      likes,
      description,
      activities
    } = this.props.selectedFriend

    return (
      <div className="single-friend-container">
        <img src={image} />
        <div className="friend-description">
          <h3>{name}</h3>
          <h4>price: ${price}</h4>
          <h4>likes: {likes}</h4>
          <h4>description: {description}</h4>
          <h4>activities: {activities}</h4>
          <button type="button" onClick={() => this.handleClick()}>
            Add to cart!
          </button>
          <div>
            {this.state.isAdded && (
              <Alert variant="success">
                You have added {name} to your cart!
              </Alert>
            )}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  selectedFriend: state.friends.selectedFriend,
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  getFriend: id => dispatch(getFriend(id)),
  addtoCart: (id, obj) => dispatch(addAFriendThunk(id, obj)),
  me: () => dispatch(me()),
  addtoCartAsGuest: obj => dispatch(addGuestThunk(obj))
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleFriendView)
