const sequelize = require('../config/connection');
const { Club, Book, Member } = require('../models');

const bookSeedData = require('./bookSeedData.json');
const clubSeedData = require('./clubSeedData.json');
const memberSeedData = require('./memberSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const books = await Book.bulkCreate(bookSeedData);

  const members = await Member.bulkCreate(memberSeedData);

  const clubs = await Club.bulkCreate(clubSeedData);

  return(members, books, clubs);
}

  // // Create trips at random
  // for (let i = 0; i < 10; i++) {
  //   // Get a random traveller's `id`
  //   const { id: randomMemberId } = members[
  //     Math.floor(Math.random() * members.length)
  //   ];

  //   // Get a random location's `id`
  //   const { id: randomBookId } = books[
  //     Math.floor(Math.random() * books.length)
  //   ]};


seedDatabase();