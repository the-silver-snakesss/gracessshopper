import React from 'react'
import {connect} from 'react-redux'
import {getFriends} from '../store/friends'

class InventoryList extends React.Component {
  componentDidMount() {
    this.props.getFriends()
  }
  render() {
    return (
      <div>
        <h1>Here are some friends!</h1>
        {this.props.friends.map(friend => (
          <div key={friend.id}>{friend.name}</div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  friends: state.friends.friends,
  singleFriend: state.friends.selectedFriend
})

const mapDispatch = dispatch => ({
  getFriends: () => dispatch(getFriends())
})

export default connect(mapState, mapDispatch)(InventoryList)
