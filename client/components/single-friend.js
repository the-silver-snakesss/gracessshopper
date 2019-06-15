import React from 'react'
import {Link} from 'react-router-dom'
const SingleFriend = props => {
  const {name, image, price, id} = props
  return (
    <div className="thumbnail">
      <img className="friend-image" src={image} alt="friend-image" />
      <Link to={`/friends/${id}`}>
        <h3>{name}</h3>
      </Link>
      <h4>price: ${price}</h4>
    </div>
  )
}
export default SingleFriend
