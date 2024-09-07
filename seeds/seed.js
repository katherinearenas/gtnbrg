const sequelize = require('../config/connection');
const { Club, Book, Member } = require('../models');

const bookSeedData = require('./bookSeedData.json');
const clubSeedData = require('./clubSeedData.json');
const memberSeedData = require('./memberSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced successfully!');

  const books = await Book.bulkCreate(bookSeedData);
  console.log('Books seeded successfully!');

  const members = await Member.bulkCreate(memberSeedData);
  console.log('Members seeded successfully!');

  const clubs = await Club.bulkCreate(clubSeedData);
  console.log('Clubs seeded successfully!');

  return(members, books, clubs);
}

seedDatabase();
