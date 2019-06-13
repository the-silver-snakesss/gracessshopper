const router = require('express').Router()
const {Order, Friend} = require('../db/models')
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
    res.json(userOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/pending/:userId', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'pending'
      },
      include: [{model: Friend}]
    })
    res.json(userOrders)
  } catch (error) {
    next(error)
  }
})
