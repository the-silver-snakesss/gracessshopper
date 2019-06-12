const Sequelize = require('sequelize')
const db = require('../db')

const Friend = db.define('friend', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  likes: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  activities: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.FLOAT(4),
    allowNull: false
  },
  instock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 10
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})
module.exports = Friend
