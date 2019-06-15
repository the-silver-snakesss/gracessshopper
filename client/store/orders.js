import axios from 'axios'
import history from '../history'

//Action types
const GOT_ORDERS = 'GOT_ORDERS'
const GOT_CART = 'GOT_CART'
const DELETE_FRIEND = 'DELETE_FRIEND'
const NO_FRIENDS = 'NO_FRIENDS'
const GUEST_ADD = 'GUEST_ADD'

let count = 0

//Action Creators
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
export const addFriendAsGuest = obj => ({
  type: GUEST_ADD,
  pendingGuestOrder: obj
})
//Thunk Creators

export const getOrdersThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/complete/${userId}`)
    dispatch(gotOrders(data))
  } catch (error) {
    console.error(error)
  }
}

export const getCartThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/pending/${userId}`)
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

export const addGuestThunk = obj => dispatch => {
  let cart = Object.values(localStorage)

  for (let i = 0; i < cart.length; i++) {
    if (JSON.parse(cart[i]).id === obj.id) {
      alert('Sorry try adding a different friend')
      return null
    }
  }

  localStorage.setItem(`item${count++}`, JSON.stringify(obj))
  dispatch(addFriendAsGuest(obj))
}

//Initial State
const initialSate = {
  loading: true,
  orders: [],
  cart: [],
  guestCart: Object.values(localStorage)
}

//Reducer

export default function(state = initialSate, action) {
  switch (action.type) {
    case GOT_CART:
      return {...state, cart: [...action.cart], loading: false}
    case GOT_ORDERS:
      return {...state, orders: [...action.orders]}
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
