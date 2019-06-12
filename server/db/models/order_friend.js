const Sequelize = require('sequelize')
const db = require('../db')

const Order_Friends = db.define('order_friends', {
  Quantity: {
    type: Sequelize.INTEGER,
    default: 1
  }
})

module.exports = Order_Friends
