const User = require('./user')
const Order = require('./order')
const Friend = require('./friend')
const Order_Friends = require('./order_friend')
// const Item = require('./item') /or const Friend = require('./friend')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Order.belongsTo(User)

Order.belongsToMany(Friend, {through: 'order_friends'})
Friend.belongsToMany(Order, {through: 'order_friends'})

module.exports = {
  User,
  Order,
  Friend
}
