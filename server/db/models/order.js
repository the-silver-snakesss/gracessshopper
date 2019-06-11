const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  username: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  }
})

module.exports = Order
