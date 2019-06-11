import axios from 'axios'
import history from '../history'

//Action types
const GOT_ALL_FRIENDS = 'GOT_ALL_FRIENDS'
const GOT_FRIEND = 'GOT_FRIEND'

//Action Creators
export const gotAllFriends = friends => ({
  type: GOT_ALL_FRIENDS,
  friends
})

export const gotFriend = friend => ({
  type: GOT_FRIEND,
  friend
})

//Thunk Creators
export const getFriends = () => async dispatch => {
  try {
    const {data} = await axios.get('api/friends')
    dispatch(gotAllFriends(data))
  } catch (error) {
    console.error(error)
  }
}

export const getFriend = id => async dispatch => {
  try {
    const {data} = await axios.get(`api/friends/${id}`)
    dispatch(gotFriend(data))
  } catch (error) {
    console.error(error)
  }
}

//Initial State
const initialSate = {
  friends: [],
  selectedFriend: {}
}

//Reducer

export default function(state = initialSate, action) {
  switch (action.type) {
    case GOT_ALL_FRIENDS:
      return {...state, friends: [...action.friends]}
    case GOT_FRIEND:
      return {...state, selectedFriend: {...action.friend}}
    default:
      return state
  }
}
