/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Welcome} from './welcome'
export {default as InventoryList} from './inventory-list'
export {default as SingleFriend} from './single-friend'
export {default as SingleFriendView} from './single-friend-view'
export {default as GuestCart} from './guest-cart'
export {default as CartView} from './cart-view'
export {default as CheckoutForm} from './checkout-form'
export {default as OrderPlaceView} from './order-place-view'
export {default as YourOrders} from './your-orders'
