import axios from 'axios'

const GUEST_ADD = 'GUEST_ADD'

let count = 0

export const addFriendAsGuest = (obj, num) => ({
  type: GUEST_ADD,
  friend: obj,
  cartCount: num
})

export const clearCart = () => dispatch => {
  localStorage.clear()
  dispatch(addFriendAsGuest())
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
  dispatch(addFriendAsGuest(obj, localStorage.length))
}

export const guestCheckout = formInfo => async dispatch => {
  let cart = Object.values(localStorage)
  let {data} = await axios.post('api/orders/guestcheckout', formInfo) //creates initial order as complete
  cart.forEach(async friend => {
    friend = JSON.parse(friend)
    await axios.post(`api/orders/guestcheckout/${data.id}`, {
      friendId: friend.id
    })
    await axios.put(`api/orders/guestcheckout/stock/${friend.id}`, {
      stock: friend.instock
    }) //creating the association
  })
  dispatch(clearCart())
}

export const removeCartItem = friendId => dispatch => {
  let cart = Object.entries(localStorage)
  cart.forEach(friend => {
    let friendObj = JSON.parse(friend[1])
    if (friendObj.id === friendId) {
      localStorage.removeItem(friend[0])
    }
  })
  dispatch(addFriendAsGuest())
}

const initialState = {
  cart: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GUEST_ADD:
      return {
        ...state,
        cart: [...state.cart, action.friend],
        cartCount: action.cartCount
      }
    default:
      return state
  }
}
