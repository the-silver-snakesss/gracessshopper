import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Navbar from 'react-bootstrap/Navbar'

const TopNavbar = ({handleClick, cart, isLoggedIn, guestCart}) => (
  <div>
    <h1 className="navbar-header">
      Imagine <img src="/assets/images/flower.png" /> Nation
    </h1>
    <Navbar bg="light" variant="light">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">
            <img src="/assets/icons/home-page.png" className="home-icon" />
          </Link>
          <Link to="/all">Shop</Link>
          <a className="justify-content-end" href="#" onClick={handleClick}>
            Logout
          </a>

          <Link className="right-navbar" to="/cart">
            <img
              className="cart-icon"
              src="assets/icons/cart.png"
              alt="cart icon"
            />
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
              src="assets/icons/cart.png"
              alt="cart icon"
            />
          </Link>
        </div>
      )}
    </Navbar>
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

export default connect(mapState, mapDispatch)(TopNavbar)

/**
 * PROP TYPES
 */
TopNavbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
