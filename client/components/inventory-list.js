import React from 'react'
import {connect} from 'react-redux'
import {getFriends} from '../store/friends'
import SingleFriend from './single-friend'
import {Card, CardDeck} from 'react-bootstrap'

class InventoryList extends React.Component {
  componentDidMount() {
    this.props.getFriends()
  }
  render() {
    return (
      <div>
        <h1>Here are some friends!</h1>

        <div className="inventory-container">
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
