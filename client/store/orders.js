import axios from 'axios'
import history from '../history'

//Action types
const GOT_ORDERS = 'GOT_ORDERS'

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

export const deleteFriend = friendId => ({
  type: DELETE_FRIEND,
  friendId
})

//Thunk Creators

export const getOrdersThunk = (status, userId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${status}/${userId}`)
    if (data) {
      dispatch(gotOrders(data))
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
    dispatch(getOrdersThunk(id))
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
  orders: []
}

//Reducer

export default function(state = initialSate, action) {
  switch (action.type) {
    case GOT_ORDERS:
      return {...state, orders: [...action.orders], loading: false}
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
