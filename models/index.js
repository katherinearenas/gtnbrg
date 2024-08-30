const Book = require('./Books');
const Club = require('./Clubs');
const Member = require('./Members');
const Library = require('./Libraries');
const Memberlist = require('./Memberlists')

Book.belongsToMany(Member, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Library,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'collection'
});

Book.belongsToMany(Club, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Library,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'reading_list'
});

Club.belongsToMany(Member, {
  through: {
    model: Memberlist,
    unique: false
  },
  as: 'member_list'
});

Member.belongtoMany(Club, {
  through: {
    model: Memberlist,
    unique: false
  },
  as: 'membership'
});

module.exports = { Book, Club, Member, Library };
