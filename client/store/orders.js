import axios from 'axios'
import history from '../history'

//Action types
const GOT_ORDERS = 'GOT_ORDERS'

//Action Creators
export const gotOrders = orders => ({
  type: GOT_ORDERS,
  orders
})

//Thunk Creators
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
  orders: {}
}

//Reducer

export default function(state = initialSate, action) {
  switch (action.type) {
    case GOT_ORDERS:
      return {...state, orders: {...action.orders}}
    default:
      return state
  }
}
