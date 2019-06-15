import axios from 'axios'

const GUEST_ADD = 'GUEST_ADD'

let count = 0

export const addFriendAsGuest = () => ({
  type: GUEST_ADD
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
  dispatch(addFriendAsGuest(obj))
}

export const guestCheckout = formInfo => async dispatch => {
  let cart = Object.values(localStorage)
  let {data} = await axios.post('api/orders/guestcheckout', formInfo) //creates initial order as complete
  cart.forEach(async friend => {
    friend = JSON.parse(friend)
    await axios.post(`api/orders/guestcheckout/${data.id}`, {
      friendId: friend.id
    }) //creating the association
  })
  dispatch(clearCart())
}

export default function(state = Object.values(localStorage), action) {
  switch (action.type) {
    case GUEST_ADD:
      return [...Object.values(localStorage)]
    default:
      return state
  }
}
