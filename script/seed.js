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
        'Please buy this delicious Leaf for your sloth friend! It is green and picked fresh from a local home grown tree. Makes for a meal that will have you saying, "Bon Appetit!!"',
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
    }),
    Product.create({
      name: 'Idle Sloth Door Hanger',
      imageUrl: '/img/idleSloth.jpg',
      description: 'Ideal for your room, and office. Tough, Durable Plastic!',
      price: 299,
      stock: 199
    }),
    Product.create({
      name: 'Warmies Sloth Hugs',
      imageUrl: '/img/warmies-sloth-hugs.png',
      description:
        'Fun, fully microwavable hugging sloths made from luxurious soft plush. Simply warm in a microwave to soothe, relax & comfort.',
      price: 232,
      stock: 120
    }),
    Product.create({
      name: 'Hugging Stuffed Sloth Bracelets',
      imageUrl: '/img/stuffed-sloth-bracelet.png',
      description:
        'Sloths may be the slowest animals around, but your love for these plush pals will grow oh-so-fast! Wild additions to kids toys, giveaways and party favors, these stuffed animals are ready to give you a hug. When it comes to zoo animals, sloths are one that kids of all ages adore, and when made as stuffed ready-to-hug toys, they are even more irresistible! Includes bendable metal band arms. Plush. 9"',
      price: 112,
      stock: 100
    }),
    Product.create({
      name: 'Taco Bout this Sleepy Sloth Dog Toy',
      imageUrl: '/img/taco.png',
      description:
        'All your furry friend will want to do is taco ‘bout his new Pet Shop by Fringe Studio toy. Taco ‘Bout this Sleepy Sloth Dog Toy not only features a filled taco with a mustache and a jolly face, but it also has a fluffy sleepy sloth on top who just doesn’t want to let go! Even though this one-of-a-kind plush is undeniably adorable, it’s what’s on the inside that really counts. Your canine companion will love discovering the two extra-loud internal squeaker that are sure to tempt him to play an exciting game of fetch or catch. And although this novelty toy may not be designed for aggressive chewers, it makes the paw-fect pal for any sidekick who loves a good snuggle!',
      price: 321,
      stock: 20
    }),
    Product.create({
      name: 'Advice From A Sloth',
      imageUrl: '/img/advice.png',
      description:
        'Kickstart the new year and achieve your goals with this advice from a sloth',
      price: 500,
      stock: 200
    }),
    Product.create({
      name: 'Heep',
      imageUrl: '/img/Heep-Large-Front_540x.png',
      description:
        'Heep is very lazy. His tiny head doesn’t believe in words like hurry. A tiny headed sloth that is sure to bring big smiles. Heep is strong on the inside, yet soft and cuddly on the outside—a mellow mate for anyone ages 3+! Whether you buy him funnel cake, take him on a treasure hunt, or bring him to the arcade — you are sure to have a ton of tiny headed fun.',
      price: 789,
      stock: 300
    }),
    Product.create({
      name: 'Sloth Lazy Just Do It Later Hoodie',
      imageUrl: '/img/sloth-lazy-just-do-it-later-hoodie.jpg',
      description:
        'Do It Later Funny Sleepy Sloth For Lazy Sloth Lovers .This Procrastination Sloth t-shirt makes a great gift for lazy people, animal lovers, sleeping, Pet lovers, or people that love coffee.',
      price: 2800,
      stock: 50
    }),
    Product.create({
      name: 'Sloth Lazy Just Do It Later T-Shirt',
      imageUrl: '/img/just-do-it-later.jpg',
      description:
        'Do It Later Funny Sloth T-Shirt For Lazy Sloth Lovers .This Procrastination Sloth t-shirt makes a great gift for lazy people, animal lovers, sleeping, Pet lovers, or people that love coffee.',
      price: 2800,
      stock: 50
    }),
    Product.create({
      name: 'Sloth Lazy Cant Someone Else Do It T-Shirt',
      imageUrl: '/img/can-someone-else-do-it.jpg',
      description:
        'Can t Someone Else Do It Sloth T-Shirt For Lazy Sloth Lovers .This Procrastination Sloth t-shirt makes a great gift for lazy people, animal lovers, sleeping, Pet lovers, or people that love coffee.',
      price: 2750,
      stock: 70
    }),
    Product.create({
      name: 'Black Cute Sloths Compression Socks',
      imageUrl: '/img/compression-socks.png',
      description:
        'We re crazy and crazy about keeping your feet and legs in great condition to go the distance while looking stylish in our true graduated compression socks and sleeves!',
      price: 1540,
      stock: 60
    }),
    Product.create({
      name: 'Sloth Metal Street Sign',
      imageUrl: '/img/ground-sloth-drive.jpg',
      description:
        'Ground Sloth lovers check out this awesome street sign! This will make the perfect piece for any Ground Sloth fan. Made of premium aluminum it will stand the test of time. This sign will look great in any room, home den, cave, or office!',
      price: 3200,
      stock: 90
    }),
    Product.create({
      name: 'Stylish Sloth Mens Shirt',
      imageUrl: '/img/stylish-t.jpg',
      description:
        'This debonair sloth is looking fine in his three piece suit. It only took him 7 hours to get dressed this morning.',
      price: 4500,
      stock: 190
    }),
    Product.create({
      name: 'Astronaut Sloth White T-Shirt',
      imageUrl: '/img/astronaut-sloth.png',
      description:
        'One small step for a sloth, one giant leap for slothkind. This lightweight white tee features an image of perhaps the slowest animal on earth or in space - the sloth!',
      price: 4550,
      stock: 130
    }),
    Product.create({
      name: 'Don t Rush Me T-Shirt',
      imageUrl: '/img/rush.png',
      description: 'Get ahead with this awesome Don t Rush Me T-Shirt',
      price: 4350,
      stock: 100
    }),
    Product.create({
      name: 'Official Scrabble - Limited Edition!',
      imageUrl: '/img/scrabble.png',
      description:
        'Limited edition of the official Scrabble, brought to you by Hasbro. Manufactured in China.',
      price: 7650,
      stock: 20
    }),
    Product.create({
      name: 'Corona Virus Outbreak Sticker Collection',
      imageUrl: '/img/stickers.png',
      description: 'Corona Virus Sticker Collection.',
      price: 450,
      stock: 10
    }),
    Product.create({
      name: 'Corona Virus W ill Save The Planet Tote',
      imageUrl: '/img/tote1.png',
      description:
        'Cool motivational T-Shirt for corona patient and Researchers Doctors motivation to resist and find a cure fore corona virus.',
      price: 1500,
      stock: 50
    }),
    Product.create({
      name: 'Corona Virus Made By Humans Tote',
      imageUrl: '/img/humans.png',
      description:
        'Cool motivation T-Shirt for humans to showcase their achievements',
      price: 4450,
      stock: 20
    }),
    Product.create({
      name: 'I Don t Care Sloth Coffe Mug',
      imageUrl: '/img/i-dont-care.jpg',
      description:
        'Keep it real during your next corporate gifting splurge. Set the tone and get the message across that you like to be lazy and sloth-like and you DGAF what others think!',
      price: 170,
      stock: 90
    }),
    Product.create({
      name: 'Sloth BAE T-Shirt',
      imageUrl: '/img/bae-t.png',
      description: 'This T-Shirt needs no description.',
      price: 2500,
      stock: 100
    }),
    Product.create({
      name: 'Party Animal Anniversary Card',
      imageUrl: '/img/anniversary-card.png',
      description: 'The perfect card for your 1-year wedding anniversary!',
      price: 170,
      stock: 90
    }),
    Product.create({
      name: 'Enlighten Me',
      imageUrl: '/img/light.png',
      description: 'Enlighten Me',
      price: 5470,
      stock: 20
    }),
    Product.create({
      name: 'Do not want to do list note pad',
      imageUrl: '/img/list.jpg',
      description:
        'Get started on the wrong foot with this Do NOT want TODO list.',
      price: 127,
      stock: 40
    }),
    Product.create({
      name: 'Sloth yoga class',
      imageUrl: '/img/yoga.jpg',
      description: 'Hang in there. Practice your downward sloth.',
      price: 127,
      stock: 40
    }),
    Product.create({
      name: 'Sloth Rocket Moon trip',
      imageUrl: '/img/rocket.png',
      description:
        'Beat Elon Musk to the moon with this exclusive one way trip.',
      price: 15700,
      stock: 2
    }),
    Product.create({
      name: 'Zootopia Movie Scene: Sloths Run the DMV',
      imageUrl: '/img/zootopia.png',
      description:
        'Get this Zootopia movie scene on repeat. Two hours that will calm your nerves: Sloths Run the DMV',
      price: 1500,
      stock: 400
    }),
    Product.create({
      name: 'How to protect yourself from Corona Virus',
      imageUrl: '/img/inspiration.jpg',
      description:
        'Learn how-to protect yourself from Corona Virus with this must-have book',
      price: 1790,
      stock: 30
    }),
    Product.create({
      name: 'Nirvana Nerversloth Iconic Album',
      imageUrl: '/img/neversloth.png',
      description:
        'Because sloths make everything better...Nirvana Nerversloth Iconic Album',
      price: 2000,
      stock: 40
    }),
    Product.create({
      name: 'The Sloths - Is this it - RCA Records',
      imageUrl: '/img/thesloths-isthisit-rcarecords.png',
      description: 'Because sloths make everything better...RCA Records Album',
      price: 2100,
      stock: 20
    }),
    Product.create({
      name: 'Apple Records',
      imageUrl: '/img/appple-records-album.png',
      description:
        'Because sloths make everything better...Apple Records Album',
      price: 2100,
      stock: 20
    }),
    Product.create({
      name: 'Sloth this way',
      imageUrl: '/img/sloth-this-way-album.png',
      description:
        'Because sloths make everything better...Sloth this way Album',
      price: 2150,
      stock: 20
    }),
    Product.create({
      name: 'The Freewheelin - Sloth Dylan',
      imageUrl: '/img/the-freewheelinslothdylan-album.png',
      description: 'Because sloths make everything better...Sloth Dylan Album',
      price: 2180,
      stock: 20
    }),
    Product.create({
      name: 'SLOTH',
      imageUrl: '/img/SLOTH-Island-records-album.png',
      description:
        'Because sloths make everything better...Sloth Island Records Album',
      price: 2190,
      stock: 20
    }),
    Product.create({
      name: 'Don t eat me iPhone Case',
      imageUrl: '/img/bat.png',
      description: 'Don t eat me, bat may cause corona virus',
      price: 1500,
      stock: 30
    }),
    Product.create({
      name: 'Travel Mug',
      imageUrl: '/img/cough-travel-mug.png',
      description:
        'Get ready to travel abroad, specifically to China, Japan, and Italy! I know it is tough but please don t cough MUG.',
      price: 2200,
      stock: 40
    }),
    Product.create({
      name: 'Iconic Corona Beer MEME',
      imageUrl: '/img/coronabeer.png',
      description: 'Download this iconic MEME to save as a screen saver.',
      price: 400,
      stock: 1000
    }),
    Product.create({
      name: 'Sloth Corona Sticker',
      imageUrl: '/img/sloth-sticker.png',
      description: 'Who does not like stickers?',
      price: 100,
      stock: 1000
    }),
    Product.create({
      name: 'Monkey Corona Sticker',
      imageUrl: '/img/monkey-sticker.png',
      description: 'Who does not like stickers?',
      price: 100,
      stock: 1000
    }),
    Product.create({
      name: 'Corona Virus Monkey Protection Socks',
      imageUrl: '/img/monkey-socks.png',
      description: 'A must have to protect your feet from Corona Virus',
      price: 500,
      stock: 700
    }),
    Product.create({
      name: 'Prevent Outbreaks iPhone Case',
      imageUrl: '/img/prevent-outbreaks-case.png',
      description: 'Help spread the word.',
      price: 1700,
      stock: 500
    }),
    Product.create({
      name: 'Corona w Lime',
      imageUrl: '/img/coronavirus-w-lyme.jpg',
      description: 'Grab a bear and relax.',
      price: 1700,
      stock: 500
    }),
    Product.create({
      name: 'David Bowie Alladin Sloth Album',
      imageUrl: '/img/david.png',
      description:
        'Because sloths make everything better...David Bowie Alladin Sloth Album',
      price: 2000,
      stock: 40
    }),
    Product.create({
      name: 'Beatles Lonely Sloths Album',
      imageUrl: '/img/beatles.png',
      description:
        'Because sloths make everything better...Beatles Lonely Sloths Album',
      price: 2000,
      stock: 40
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
