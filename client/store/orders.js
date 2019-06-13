import axios from 'axios'
import history from '../history'

//Action types
const GOT_ORDERS = 'GOT_ORDERS'
const GOT_CART = 'GOT_CART'

//Action Creators
export const gotOrders = orders => ({
  type: GOT_ORDERS,
  orders
})

export const gotCart = cart => ({
  type: GOT_CART,
  cart
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
    dispatch(gotCart(data[0].friends))
  } catch (error) {
    console.error(error)
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
  loading: true,
  orders: [],
  cart: []
}

//Reducer

export default function(state = initialSate, action) {
  switch (action.type) {
    case GOT_CART:
      return {...state, cart: [...action.cart], loading: false}
    case GOT_ORDERS:
      return {...state, orders: [...action.orders]}
    default:
      return state
  }
}
