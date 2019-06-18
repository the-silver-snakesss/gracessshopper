import axios from 'axios'
import history from '../history'

//Action types
const GOT_ORDERS = 'GOT_ORDERS'
const GOT_CART = 'GOT_CART'
const DELETE_FRIEND = 'DELETE_FRIEND'
const NO_FRIENDS = 'NO_FRIENDS'
const COMPLETE_ORDER = 'COMPLETE_ORDER'

//Action Creators
export const completeOrder = orderId => ({
  type: COMPLETE_ORDER,
  orderId
})

export const noFriends = () => ({
  type: NO_FRIENDS
})

export const gotOrders = orders => ({
  type: GOT_ORDERS,
  orders
})

export const gotCart = cart => ({
  type: GOT_CART,
  cart
})

export const deleteFriend = friendId => ({
  type: DELETE_FRIEND,
  friendId
})

//Thunk Creators

export const getOrdersThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/complete/${userId}`)
    if (data) {
      dispatch(gotOrders(data))
    } else {
      dispatch(noFriends())
    }
  } catch (error) {
    console.error(error)
  }
}
export const getCartThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/pending/${userId}`)
    console.log('THIS IS DATA', data)
    if (data) {
      dispatch(gotCart(data))
    } else {
      dispatch(noFriends())
    }
  } catch (error) {
    console.error(error)
  }
}

export const addAFriendThunk = (id, obj) => async dispatch => {
  try {
    const res = await axios.post(`/api/users/${id}/add`, obj)
    dispatch(getCartThunk(id))
  } catch (err) {
    console.error(err)
  }
}

export const deleteFriendThunk = (orderId, friendId) => async dispatch => {
  try {
    const {data} = await axios.delete(
      `/api/orders/delete/${orderId}/${friendId}`
    )
    dispatch(deleteFriend(friendId))
  } catch (error) {
    console.error(error)
  }
}

export const completeOrderThunk = (info, userId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/checkout/${userId}`, info)
    dispatch(getOrdersThunk(userId))
  } catch (error) {
    console.error(error)
  }
}

//Initial State
const initialSate = {
  loading: true,
  orders: [],
  cart: []
}

//Reducer

export default function(state = initialSate, action) {
  switch (action.type) {
    case GOT_ORDERS:
      return {...state, orders: [...action.orders], loading: false}
    case GOT_CART:
      return {...state, cart: [...action.cart], loading: false}
    case DELETE_FRIEND:
      return {
        ...state,
        cart: state.cart.filter(friend => friend.id !== action.friendId)
      }
    case NO_FRIENDS:
      return {...state, cart: [], loading: false}
    default:
      return state
  }
}
