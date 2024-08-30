const Book = require('./Books');
const Club = require('./Club');
const Member = require('./Members');
const Library = require('./Libraries');

Book.belongsToMany(Member, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Library,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'book_collection'
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

Club.belongsTo(Member, {});

Member.hasMany(Club, {})

module.exports = { Book, Club, Member, Library };
