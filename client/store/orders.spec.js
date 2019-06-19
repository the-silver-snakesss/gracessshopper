import {expect} from 'chai'

import {default as reducer} from './orders'

import {gotOrders, gotCart, getCartThunk, getOrdersThunk} from './orders'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('AUTHENTICATE ORDERS REDUCER', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal({
      loading: true,
      orders: [],
      cart: []
    })
  })
})

describe('Thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    loading: true,
    orders: [],
    cart: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('got orders', () => {
    it('eventually dispatches the GOT ORDERS action', async () => {
      const fakeUser = {id: 2, name: 'Ally', email: 'Ally@email.com'}
      const userId = fakeUser.id
      mockAxios.onGet(`/api/orders/complete/${userId}`).replyOnce(200, fakeUser)
      await store.dispatch(getOrdersThunk(userId))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ORDERS')
    })
  })

  describe('got a cart', () => {
    it('eventually dispatches the GOT CART action', async () => {
      const fakeUser = {id: 1, name: 'Cody', email: 'Cody@email.com'}
      const userId = fakeUser.id
      mockAxios.onGet(`/api/orders/pending/${userId}`).replyOnce(200, fakeUser)
      await store.dispatch(getCartThunk(userId))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_CART')
    })
  })
})
