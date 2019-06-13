import axios from 'axios'
import history from '../history'

//Action types
const ADD_A_FRIEND = 'ADD_A_FRIEND'
const GOT_ORDERS = 'GOT_ORDERS'

//Action Creators
export const addAFriendActionCreator = (userId, obj) => ({
  type: ADD_A_FRIEND,
  pendingOrder: obj,
  id: userId
})

export const gotOrders = orders => ({
  type: GOT_ORDERS,
  orders
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

export const getOrdersThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${userId}`)
    dispatch(gotOrders(data[0]))
  } catch (error) {
    next(error)
  }
}

//Initial State
const initialSate = {
  addtoCart: [],
    orders: {}

}

//Reducer

export default function(state = initialSate, action) {
  switch (action.type) {
    case ADD_A_FRIEND:
      return {
        ...state,
        addtoCart: [...state.addtoCart, action.pendingOrder]
      }
     case GOT_ORDERS:
      return {...state, orders: {...action.orders}}
    default:
      return state
  }
}
