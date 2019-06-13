import axios from 'axios'
import history from '../history'

//Action types
const ADD_A_FRIEND = 'ADD_A_FRIEND'
const GOT_ORDERS = 'GOT_ORDERS'
const GOT_CART = 'GOT_CART'

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

export const gotCart = cart => ({
  type: GOT_ORDERS,
  cart
})

//Thunk Creators

export const getOrdersThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/complete/${userId}`)
    dispatch(gotOrders(data))
  } catch (error) {
    next(error)
  }
}

export const getCartThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/pending/${userId}`)
    dispatch(gotCart(data))
  } catch (error) {
    next(error)
  }
}
// still working on add friend thunk and get cart thunk relationship
export const addAFriendThunk = (id, obj) => async dispatch => {
  try {
    const res = await axios.post(`/api/users/${id}/add`, obj)
    dispatch(getCartThunk(id))
  } catch (err) {
    console.error(err)
  }
}

//Initial State
const initialSate = {
  orders: [],
  cart: []
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
      return {...state, orders: [...action.orders]}
    default:
      return state
  }
}
