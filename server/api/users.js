const router = require('express').Router()
const {User, Order, Friend, Order_Friends} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/add', async (req, res, next) => {
  try {
    // if (req.params.id.length > 2) {
    //   console.log(true)
    // }
    console.log('this is the id', req.params.id)
    const validate = await Order.findOne({
      where: {
        userId: req.params.id,
        status: 'pending'
      },
      include: [{model: Friend}],
      returning: true,
      raw: true
    })
    if (validate) {
      const added = await Order_Friends.create({
        quantity: 1,
        orderId: validate.id,
        friendId: req.body.id
      })
      res.status(201).json(added)
    } else {
      const addedFriend = await Order.create({
        status: 'pending',
        userId: req.params.id
      })
      const added = await Order_Friends.create({
        quantity: 1,
        orderId: addedFriend.id,
        friendId: req.body.id
      })
      res.status(201).json(addedFriend)
    }
  } catch (error) {
    next(error)
  }
})
