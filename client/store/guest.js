const GUEST_ADD = 'GUEST_ADD'
let count = 0

export const addFriendAsGuest = friend => ({
  type: GUEST_ADD,
  friend
})

export const addGuestThunk = obj => dispatch => {
  dispatch(addFriendAsGuest(obj))
}

export default function(state = [], action) {
  switch (action.type) {
    case GUEST_ADD:
      return [...state, friend]
    default:
      return state
  }
}
