const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  Status: {
    type: Sequelize.ENUM('pending', 'complete')
  }
})

module.exports = Order
