const router = require('express').Router()
const {User, Order, Friend, Order_Friends} = require('../db/models')
module.exports = router

const isAuth = (req, res, next) => {
  if (!req.session.userId) {
    res.status(401).send({message: 'YOU SHALL NOT PASS'})
  } else {
    next()
  }
}

router.get('/', isAuth, async (req, res, next) => {
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

router.post('/:id/add', isAuth, async (req, res, next) => {
  try {
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
