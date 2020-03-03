'use strict';

const db = require('../server/db');
const {User, Product, Cart} = require('../server/db/models');

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
    })
  ]);

  const products = await Promise.all([
    Product.create({
      name: 'Sloth Bed'
    }),
    Product.create({
      name: 'Sloth Mask'
    })
  ]);

  const carts = await Promise.all([
    Cart.create({
      userId: 1,
      productId: 1,
      quantity: 1
    }),
    Cart.create({
      userId: 2,
      productId: 2,
      quantity: 2
    })
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${carts.length} carts`);
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
