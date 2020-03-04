'use strict';

const db = require('../server/db');
const {User, Product, Order, LineItem} = require('../server/db/models');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      isAdmin: false,
      firstName: 'Cody',
      lastName: 'Barnes'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      isAdmin: true,
      firstName: 'Murphy',
      lastName: 'Clark'
    }),
    User.create({
      email: 'slothy@mcslothertonfamilyemailsite.net',
      password: 'bamb00',
      isAdmin: true,
      firstName: 'Slothy',
      lastName: 'McSlotherton'
    })
  ]);

  const products = await Promise.all([
    Product.create({
      name: 'Sloth Bed',
      imageUrl: '/img/bed.jpg',
      description:
        'Only the finest Sloth Beds at Grace Slothpper. All beds are sloth-tested and extra comfortable!',
      price: 1499,
      stock: 10000
    }),
    Product.create({
      name: 'Sloth Mask',
      imageUrl: '/img/mask.jpg',
      description:
        'With a frightening Corona Virus outbreak on the horizon, your sloths will need to be protected too! Get this Sloth Corona Virus Mask to keep your sloth free from harm. This product is sold without any warranty.',
      price: 14999,
      stock: 197
    }),
    Product.create({
      name: 'Coronal Virus COVID-19 Vaccine',
      imageUrl: '/img/vaccine.jpg',
      description:
        'Protect yourself and your sloth from the harmful Corona Virus with this affordable and exclusive patented vaccine! Our proprietary techology is the best at blocking the corona virus with counter virals that embed directly into the skin for maximum coverage. We do NOT accept any insurance!!!!',
      price: 999999,
      stock: 11
    }),
    Product.create({
      name: 'Corona Blocker 3000',
      imageUrl: '/img/coronablocker3000.jpg',
      description:
        'Receive maximum protection from this high quality Corona Blocker mask! Manufactured in Wuhan, China, every mask has been human-tested in factory for Quality Assurance. 50% off for a limited time! (NOTE: for international orders, product will arrive in discreet unmarked packaging)',
      price: 21499,
      stock: 385
    }),
    Product.create({
      name: 'Sloth Leaf',
      imageUrl: '/img/leaf.jpg',
      description:
        'Please buy this delcious Leaf for your sloth friend! It is green and picked fresh from a local home grown tree. Makes for a meal that will have you saying, "Bon Appetit!!"',
      price: 40,
      stock: 82
    }),
    Product.create({
      name: 'Sloth Sushi',
      imageUrl: '/img/sushi.jpg',
      description:
        'Try out our delicious Sloth Sushi, good for people AND sloths! It has rice and carrots. Look at it smiling back at you! It is perfect for vegetarians.',
      price: 80,
      stock: 36
    }),
    Product.create({
      name: '2 Slow 2 Curious Movie DVD',
      imageUrl: '/img/2slow2curious.jpg',
      description:
        'The sloths are back and slower than ever! Catch this classic featuring Slothacris on DVD while supplies last -- or attend one of our live showings every Thursday morning!',
      price: 2699,
      stock: 50
    })
  ]);

  const orders = await Promise.all([
    Order.create({
      isCart: true
    })
  ]);

  await users[0].addOrder(orders[0]);
  await orders[0].addProducts(products[0]);
  const item = await LineItem.findOne({
    where: {
      orderId: orders[0].id,
      productId: products[0].id
    }
  });
  item.quantity = 99;
  await item.save();

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
