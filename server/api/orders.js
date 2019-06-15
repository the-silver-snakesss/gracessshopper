const router = require('express').Router()
const {Order, Friend, Order_Friends} = require('../db/models')
module.exports = router

router.get('/complete/:userId', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'complete'
      },
      include: [{model: Friend}]
    })
    res.status(200).json(userOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/pending/:userId', async (req, res, next) => {
  try {
    const [userOrders] = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'pending'
      },
      include: [{model: Friend}]
    })
    if (userOrders) {
      res.status(200).json(userOrders.friends)
    } else res.json([])
  } catch (error) {
    next(error)
  }
})

router.post('/guestcheckout', async (req, res, next) => {
  console.log('REQ BODY', req.body)
  let {dataValues} = await Order.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    status: 'complete'
  })
  res.status(201).json(dataValues)
})

router.post('/guestcheckout/:orderId', async (req, res, next) => {
  console.log('posting friend')
  await Order_Friends.create({
    quantity: 1,
    orderId: req.params.orderId,
    friendId: req.body.friendId
  })
  res.sendStatus(201)
})

router.delete('/delete/:orderId/:friendId', async (req, res, next) => {
  try {
    await Order_Friends.destroy({
      where: {
        orderId: req.params.orderId,
        friendId: req.params.friendId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
