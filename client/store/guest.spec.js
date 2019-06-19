import {expect} from 'chai'

import {default as reducer} from './guest'
import {addGuestThunk, GUEST_ADD} from './guest'

describe('AUTHENTICATE GUEST REDUCER', () => {
  const initialState = {cart: []}

  it('returns the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal({cart: []})
  })
})
