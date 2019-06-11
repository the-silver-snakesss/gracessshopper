import React from 'react'

const SingleFriend = props => {
  const {name, image, price} = props
  return (
    <div>
      <img src={image} />
      <h3>{name}</h3>
      <h4>{price}</h4>
    </div>
  )
}
export default SingleFriend
