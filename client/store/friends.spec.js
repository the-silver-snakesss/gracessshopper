import {expect} from 'chai'
import {default as reducer} from './friends'
import {gotAllFriends, gotFriend} from './friends'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('friends reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal({
      friends: [],
      selectedFriend: {}
    })
  })
})

describe('Thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    friends: [],
    selectedFriend: {}
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('got all friends', () => {
    it('eventually dispatches the GOT ALL FRIENDS action', async () => {
      const fakeFriend = {id: 1, name: 'Cody', email: 'Cody@email.com'}
      mockAxios.onGet('/api/friends').replyOnce(200, fakeFriend)
      await store.dispatch(gotAllFriends(fakeFriend))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ALL_FRIENDS')
      expect(actions[0].friends).to.be.deep.equal(fakeFriend)
    })
  })

  describe('got a friend', () => {
    it('eventually dispatches the GOT FRIEND action', async () => {
      const fakeFriend = {id: 1, name: 'Cody', email: 'Cody@email.com'}
      const id = fakeFriend.id
      mockAxios.onGet(`/api/friends/${id}`).replyOnce(200, fakeFriend)
      await store.dispatch(gotFriend(fakeFriend))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_FRIEND')
    })
  })
})
