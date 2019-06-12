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
      price: 19.99,
      instock: true,
      image:
        'https://vignette.wikia.nocookie.net/villains/images/7/7b/Tylerbetterpicture.jpg/revision/latest/scale-to-width-down/620?cb=20170410170911'
    })

    const friend2 = await Friend.create({
      name: 'Hobbes',
      description: 'Sardonic stuffed tiger',
      likes: 'tuna fish',
      activities: 'Leisure',
      price: 19.85,
      instock: true,
      image:
        'https://vignette.wikia.nocookie.net/dccomicsfannon/images/1/1f/Hobbes.jpg/revision/latest?cb=20171221225748'
    })
    const friend3 = await Friend.create({
      name: 'Frank',
      description: 'I can be your guide',
      likes: 'science',
      activities: 'talking about space and time continuum ',
      price: 20.01,
      instock: true,
      image: 'https://cdn-images-1.medium.com/max/1600/0*wou131aVtMKPjkyh.jpg'
    })
    const friend4 = await Friend.create({
      name: 'Lloyd',
      description: 'Bartender',
      likes: 'spending time in the Overlook Hotel',
      activities: 'drinking',
      price: 19.77,
      instock: false,
      image:
        'https://preview.redd.it/kqt98zhromn11.jpg?width=960&crop=smart&auto=webp&s=94b1730968b4d64af9ec0f41eee4bd0615a343d3'
    })
    const friend5 = await Friend.create({
      name: 'Snuffleupagus',
      description: 'big bird best friend',
      likes: 'cuddling',
      activities: 'being a good best friend',
      price: 19.69,
      instock: true,
      image:
        'https://vignette.wikia.nocookie.net/muppet/images/3/3a/Alices.jpg/revision/latest?cb=20161119035937'
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
    const friend7 = await Friend.create({
      name: 'Bunbury',
      description:
        'An English gentleman from the Victorian era with remarkably bad health',
      likes:
        'The English countryside and getting you out of unpleasant obligations.',
      activities: 'Staying home sick with you',
      price: 18.95,
      instock: true,
      image:
        '“https://i.kinja-img.com/gawker-media/image/upload/s--IARvqZA1--/c_scale,f_auto,fl_progressive,q_80,w_800/xwavtb38s3qkxds4cnop.jpg'
    })
    const friend8 = await Friend.create({
      name: 'Carol',
      description:
        'A wild thing from an island far far away, where wild things roam free!',
      likes: 'Sleeping in a big pile and building models',
      activities: 'Dirt fights and island tours',
      price: 19.63,
      instock: true,
      image:
        'http://media.onsugar.com/files/ed2/192/1922283/42_2009/39f8db1ba3ef2957_where-the-wild-things-are.jpg'
    })
    const friend9 = await Friend.create({
      name: 'Charles',
      description: 'A rowdy pal who pushes you to open up socially',
      likes: 'throwing your homework out the window and his niece Marcee',
      activities: 'taking a break from work and partying',
      price: 20.01,
      instock: true,
      image: 'https://www.aveleyman.com/Gallery/2017/B/37883-25696.jpg'
    })
    const friend10 = await Friend.create({
      name: 'Bloo',
      description: 'A blue friend with a big ego and even bigger heart',
      likes: 'getting into trouble and bragging',
      activities: 'paddle ball tournaments',
      price: 20.04,
      instock: true,
      image: 'https://img.photobucket.com/albums/1003/vampwill/BlooKing.jpg'
    })
    // ORDERS

    await Promise.all([
      friend1,
      friend2,
      friend3,
      friend4,
      friend5,
      friend6,
      friend7,
      friend8,
      friend9,
      friend10,
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
        friend7,
        friend8,
        friend9,
        friend10,
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
