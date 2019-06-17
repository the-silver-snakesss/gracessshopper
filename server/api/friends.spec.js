// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// var agent = request.agent(app)
// const Friend = db.model('friend')

// describe('Friends routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })
//   afterEach(() => {
//     return Promise.all([Friend.truncate({cascade: true})])
//   })

//   describe('/api/friends/', () => {
//     beforeEach(() => {
//       return Friend.create({
//         name: 'Harvey',
//         description: 'Very Big Bunny',
//         likes: 'Introverts',
//         activities: 'Stopping time',
//         price: 19.5,
//         instock: 10,
//         image:
//           'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZG9iza7eWXdk8Dwf2XcKS69u_BUKt80uQ-i4Dgmx5CzEiPmKk'
//       })
//     })

//     it('GET /api/friends', async () => {
//       const res = await agent.get('/api/friends').expect(200)

//       expect(res.body).to.be.an('array')
//       expect(res.body[0].name).to.be.equal('Harvey')
//       expect(res.body[0].description).to.be.equal('Very Big Bunny')
//       expect(res.body[0].likes).to.be.equal('Introverts')
//     })
//   })
// })

// describe('GET /friends/:id', () => {
//   beforeEach(() => {
//     return Friend.create({
//       name: 'Harvey',
//       description: 'Very Big Bunny',
//       likes: 'Introverts',
//       activities: 'Stopping time',
//       price: 19.5,
//       instock: 10,
//       image:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZG9iza7eWXdk8Dwf2XcKS69u_BUKt80uQ-i4Dgmx5CzEiPmKk'
//     })
//   })
// it('returns the JSON of the friend based on the id', async () => {
//   const res1 = await agent
//     .get('api/friends/1')
//     .expect(200)

//   if (typeof res1.body === 'string') {
//     res1.body = JSON.parse(res1.body)
//   }
//   console.log('this is the res!!!', res1.body)
//   expect(res1.body.name).to.equal('Harvey')
// })
// })
