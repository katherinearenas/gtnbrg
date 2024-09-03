const Book = require('./Books');
const Club = require('./Clubs');
const User = require('./Users');
const Library = require('./Libraries');
const Memberlist = require('./Memberlists')

Book.belongsToMany(User, {

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

Club.belongsToMany(User, {
  through: {
    model: Memberlist,
    unique: false
  },
  as: 'member_list'
});


User.belongsToMany(Club, {

  through: {
    model: Memberlist,
    unique: false
  },
  as: 'membership'
});

module.exports = { Book, Club, User, Library };
