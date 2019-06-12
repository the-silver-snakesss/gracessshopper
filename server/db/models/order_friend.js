const Sequelize = require('sequelize')
const db = require('../db')

const Order_Friends = db.define('order_friends', {
  quantity: {
    type: Sequelize.INTEGER,
    default: 1
  }
})

module.exports = Order_Friends
