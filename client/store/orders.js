import axios from 'axios'
import history from '../history'

//Action types
const ADD_A_FRIEND = 'ADD_A_FRIEND'

//Action Creators
export const addAFriendActionCreator = (userId, obj) => ({
  type: ADD_A_FRIEND,
  pendingOrder: obj,
  id: userId
})
//Thunk Creators
export const addAFriendThunk = (id, obj) => async dispatch => {
  try {
    const res = await axios.post(`/api/users/${id}/add`, obj)
    dispatch(addAFriendActionCreator(id, obj))
  } catch (err) {
    console.error(err)
  }
}

//Initial State
const initialSate = {
  addtoCart: []
}

//Reducer

export default function(state = initialSate, action) {
  switch (action.type) {
    case ADD_A_FRIEND:
      return {
        ...state,
        addtoCart: [...state.addtoCart, action.pendingOrder]
      }
    default:
      return state
  }
}
