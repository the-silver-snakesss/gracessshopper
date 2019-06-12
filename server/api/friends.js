const router = require('express').Router()
const {Friend} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const friends = await Friend.findAll()
    res.json(friends)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const friend = await Friend.findByPk(req.params.id)
    friend ? res.json(friend) : next()
  } catch (error) {
    next(error)
  }
})

router.post('/add/:itemId', async (req, res, next) => {
  //add to cart
})
