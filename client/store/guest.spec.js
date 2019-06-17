import {expect} from 'chai'

import {default as reducer} from './guest'
import {addGuestThunk, GUEST_ADD} from './guest'

describe('AUTHENTICATE GUEST REDUCER', () => {
  const initialState = {cart: []}

  it('returns the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal({cart: []})
  })

  // it('handles adding a friend request', () => {
  //   const obj = {id: 1, name: 'foobar'}
  //   const num = 1
  //   expect(reducer(initialState, { type: GUEST_ADD, friend: obj, cartCount: num })).to.be.equal({
  //     ...initialState,
  //     cart: [{id: 1, name: 'foobar'}],
  //     cartCount: 1
  //   });
  // });
})
