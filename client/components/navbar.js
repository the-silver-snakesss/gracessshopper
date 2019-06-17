import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, cartCount, userCartCount}) => (
  <div>
    <h1>
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
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart">
            <img
              className="cart-icon"
              src="/assets/icons/cart.png"
              alt="cart icon"
            />
          </Link>
          <Link to="#" className="circle">
            <h6 className="cart-count">{userCartCount.length}</h6>
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/all">Shop</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/guestCart">
            <img
              className="cart-icon"
              src="/assets/icons/cart.png"
              alt="cart icon"
            />
          </Link>
          <Link to="#" className="circle">
            <h6 className="cart-count">{cartCount}</h6>
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
    isLoggedIn: !!state.user.id,
    cartCount: state.guest.cartCount,
    userCartCount: state.orders.cart
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
