import React from 'react'
import {connect} from 'react-redux'
import {getFriend} from '../store/friends'
import SingleFriend from './single-friend'
class SingleFriendView extends React.Component {
  componentDidMount() {
    const friendId = Number(this.props.match.params.id)
    this.props.getFriend(friendId)
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
      <div>
        <h1>This is the single friend view</h1>
        <img src={image} />
        <h3>{name}</h3>
        <h4>price: ${price}</h4>
        <h4>likes: {likes}</h4>
        <h4>description: {description}</h4>
        <h4>activities: {activities}</h4>

        <button type="button">Add to cart!</button>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  selectedFriend: state.friends.selectedFriend
})
const mapDispatchToProps = dispatch => ({
  getFriend: id => dispatch(getFriend(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleFriendView)
