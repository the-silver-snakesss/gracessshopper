import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import friends from './friends'
import orders from './orders'
import guest from './guest'
import {loadState, saveState} from '../localStorage'

const reducer = combineReducers({user, friends, orders, guest})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

let persistedState = loadState()

const store = createStore(reducer, middleware)

store.subscribe(() => {
  saveState({
    guest: store.getState().guest
  })
})

export default store
export * from './user'
