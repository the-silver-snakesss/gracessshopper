const router = require('express').Router()
const {Order, Friend, Order_Friends, User} = require('../db/models')
module.exports = router

// ROUTE PROTECTION
const isAuth = (req, res, next) => {
  if (!req.session.userId) {
    res.status(401).send({message: 'YOU SHALL NOT PASS'})
  } else {
    next()
  }
}

router.put('/checkout/:userId', isAuth, async (req, res, next) => {
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
    const friendFind = orderFriendtoUpdate.forEach(async function(obj) {
      const friendToChange = await Friend.findOne({
        where: {
          id: obj.dataValues.friendId
        }
      })

      await friendToChange.update({
        instock: friendToChange.instock - obj.dataValues.quantity
      })
    })

    res.status(202).json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

router.get('/complete/:userId', isAuth, async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'complete'
      },
      include: [{model: Friend}]
    })

    if (userOrders) {
      res.status(200).json([...userOrders])
    } else res.json([])
  } catch (error) {
    next(error)
  }
})

router.get('/pending/:userId', isAuth, async (req, res, next) => {
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
  let {dataValues} = await Order.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    status: 'complete'
  })
  res.status(201).json(dataValues)
})

router.post('/guestcheckout/:orderId', async (req, res, next) => {
  await Order_Friends.create({
    quantity: 1,
    orderId: req.params.orderId,
    friendId: req.body.friendId
  })
  res.sendStatus(201)
})

router.put('/guestcheckout/stock/:friendId', async (req, res, next) => {
  const newStock = req.body.stock - 1
  let [, updatedFriend] = await Friend.update(
    {instock: newStock},
    {
      returning: true,
      where: {
        id: req.params.friendId
      }
    }
  )
  res.status(202).json(updatedFriend)
})

router.delete('/delete/:orderId/:friendId', isAuth, async (req, res, next) => {
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
