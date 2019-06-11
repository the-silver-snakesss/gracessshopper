const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  address: {
    type: Sequelize.TEXT
  }
})

module.exports = Order
