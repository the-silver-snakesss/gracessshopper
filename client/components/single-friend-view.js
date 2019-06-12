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
    return (
      <div>
        <h1>This is the single friend view</h1>
        <SingleFriend
          name={this.props.selectedFriend.name}
          image={this.props.selectedFriend.image}
          price={this.props.selectedFriend.price}
        />
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
