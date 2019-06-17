const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const Order_Friends = db.model('order_friends')

describe('GET /orders/pending/:id', () => {
  let thatOrder

  beforeEach(async () => {
    const creatingOrders = [
      {
        status: 'pending',
        userId: 3
      },
      {
        status: 'complete',
        userId: 3
      }
    ].map(data => Order.create(data))

    //   const creatingFK = [{
    //     quantity: 1,
    //     orderId: 1,
    //     friendId: 2
    //   }, {
    //     quantity: 4,
    //     orderId: 2,
    //     friendId: 3
    //   }

    //   ]
    // .map(data => Order_Friends.create(data))
    //   const createdOrder = await Promise.all(creatingOrders);
    //  thatOrder = createdOrder[2];
  })

  it('returns the JSON of the pending order based on the id', async () => {
    const res = await require(app)
      .get('/orders/pending/3')
      .expect(200)

    if (typeof res.body === 'string') {
      res.body = JSON.parse(res.body)
    }
    expect(res.body.status).to.equal('pending')
  })
})
