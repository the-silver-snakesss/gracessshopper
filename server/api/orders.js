const router = require('express').Router()
const {Order, Friend, Order_Friends} = require('../db/models')
module.exports = router

router.put('/checkout/:userId', async (req, res, next) => {
  try {
    const orderToUpdate = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'pending'
      }
    })
    if (!orderToUpdate) return res.sendStatus(404)

    const updatedOrder = await orderToUpdate.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      status: 'complete'
    })

    const orderFriendtoUpdate = await Order_Friends.findAll({
      where: {
        orderId: orderToUpdate.id
      }
    })

    console.log('this is the orderFRIENDS', orderFriendtoUpdate)
    res.status(202).json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

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
