import React from 'react'
import {connect} from 'react-redux'
import {getFriends} from '../store/friends'
import SingleFriend from './single-friend'

class InventoryList extends React.Component {
  componentDidMount() {
    this.props.getFriends()
  }
  render() {
    return (
      <div>
        <h1>Here are some friends!</h1>

        <div id="friends-container">
          {this.props.friends.map(friend => (
            <SingleFriend
              key={friend.id}
              name={friend.name}
              image={friend.image}
              price={friend.price}
              id={friend.id}
            />
          ))}
        </div>
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
