'use strict'

const db = require('../server/db')
const {User, Friend} = require('../server/db/models')

const seed = async () => {
  try {
    await db.sync({force: true})

    // USERS
    const user1 = await User.create({
      firstName: 'Cody',
      lastName: 'Bar',
      email: 'cody@email.com',
      password: '123'
    })
    const user2 = await User.create({
      firstName: 'Murphy',
      lastName: 'Law',
      email: 'murphy@email.com',
      password: '123'
    })
    const user3 = await User.create({
      firstName: 'Ally',
      lastName: 'Guy',
      email: 'ally@gmail.com',
      password: '123'
    })
    const user4 = await User.create({
      firstName: 'Lydie',
      lastName: 'Toussaint',
      email: 'lydie@email.com',
      password: '123'
    })
    const user5 = await User.create({
      firstName: 'Asia',
      lastName: 'Ganon',
      email: 'asia@hotmail.com',
      password: '123'
    })
    const user6 = await User.create({
      firstName: 'Natasha',
      lastName: 'Kelly',
      email: 'natasha@yahoo.com',
      password: '123'
    })

    // FRIENDS
    const friend1 = await Friend.create({
      name: 'Tyler Durden',
      description: 'First rule of Fight club...',
      likes: 'anarchy',
      activities: 'Fighting',
      price: 2.01,
      instock: true,
      image:
        'https://vignette.wikia.nocookie.net/villains/images/7/7b/Tylerbetterpicture.jpg/revision/latest/scale-to-width-down/620?cb=20170410170911',
      userId: user1.id
    })

    const friend2 = await Friend.create({
      name: 'Hobbes',
      description: 'Sardonic stuffed tiger',
      likes: 'going for walks',
      activities: 'Leisure',
      price: 50.58,
      instock: true,
      image:
        'https://vignette.wikia.nocookie.net/dccomicsfannon/images/1/1f/Hobbes.jpg/revision/latest?cb=20171221225748',
      userId: user4.id
    })
    const friend3 = await Friend.create({
      name: 'Frank',
      description: 'I can be your guide',
      likes: 'science',
      activities: 'talking about space and time continuum ',
      price: 50.09,
      instock: true,
      image: 'https://cdn-images-1.medium.com/max/1600/0*wou131aVtMKPjkyh.jpg',
      userId: user2.id
    })
    const friend4 = await Friend.create({
      name: 'Lloyd',
      description: 'Bartender',
      likes: 'spending time in the Overlook Hotel',
      activities: 'drinking',
      price: 40.24,
      instock: false,
      image:
        'https://preview.redd.it/kqt98zhromn11.jpg?width=960&crop=smart&auto=webp&s=94b1730968b4d64af9ec0f41eee4bd0615a343d3',
      userId: user3.id
    })
    const friend5 = await Friend.create({
      name: 'Snuffleupagus',
      description: 'big bird best friend',
      likes: 'cuddling',
      activities: 'being a good best friend',
      price: 150.48,
      instock: true,
      image:
        'https://vignette.wikia.nocookie.net/muppet/images/3/3a/Alices.jpg/revision/latest?cb=20161119035937',
      userId: user5.id
    })
    const friend6 = await Friend.create({
      name: 'George Glass',
      description:
        "He’s one of the nicest boys in school, and he thinks you're super cool.",
      likes: 'Trips to Hawaii and being your boyfriend',
      activities: 'Calling you on the phone and going to weddings with you',
      price: 19.96,
      instock: true,
      image:
        'https://vignette.wikia.nocookie.net/thebradybunch/images/4/41/George_Glass.png/revision/latest?cb=20180202032210'
    })

    // ORDERS

    await Promise.all([
      friend1,
      friend2,
      friend3,
      friend4,
      friend5,
      friend6,
      user1,
      user2,
      user3,
      user4,
      user5,
      user6
    ])
    console.log('Seeding Success')
    return (
      [
        friend1,
        friend2,
        friend3,
        friend4,
        friend5,
        friend6,
        user1,
        user2,
        user3,
        user4,
        user5,
        user6
      ],
      db.close()
    )
  } catch (err) {
    console.error('Oh noes! Something went wrong!')
    console.error(err)
    db.close()
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  seed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
