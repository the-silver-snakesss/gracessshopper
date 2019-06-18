import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, cart, isLoggedIn, guestCart}) => (
  <div>
    <h1 className="navbar-header">
      Imagine{' '}
      <img src="https://previews.123rf.com/images/andreahast/andreahast1106/andreahast110600004/9730759-pink-flower-of-gerber-isolated.jpg" />{' '}
      Nation
    </h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/all">Shop</Link>

          <a className="right-navbar" href="#" onClick={handleClick}>
            Logout
          </a>

          <Link className="right-navbar" to="/cart">
            <img
              className="cart-icon"
              src="assets/icons/cart.png"
              alt="cart icon"
            />
          </Link>
          <Link to="#" className="circle right-navbar">
            <h6 className="cart-count">{cart ? cart.length : 0}</h6>

          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/all">Shop</Link>
          <Link to="/guestCart">
            <img
              className="cart-icon"
              src="/assets/icons/cart.png"
              alt="cart icon"
            />
          </Link>
          <Link to="#" className="circle">

            <h6 className="cart-count">{guestCart.length}</h6>

          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cart: state.orders.cart,
    isLoggedIn: !!state.user.id,
    guestCart: state.guest
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  cartCount: PropTypes.number,
  userCartCount: PropTypes.array
}
