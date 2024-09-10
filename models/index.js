const Book = require('./Books');
const Club = require('./Clubs');
const Member = require('./Members');
const Library = require('./Libraries');
const Memberlist = require('./Memberlists');

Book.belongsToMany(Club, {
  through: {
    model: Library,
    unique: false
  },
  as: 'reading_list',
  foreignKey: 'book_id',
  otherKey: 'club_id'
});

Club.belongsToMany(Book, {
  through: {
    model: Library,
    unique: false
  },
  as: 'books_in_club',
  foreignKey: 'club_id',
  otherKey: 'book_id'
});

Club.hasOne(Member, {
  foreignKey: 'member_id',
  as: 'host'
});

Member.hasOne(Club, {
  foreignKey: 'club_id',
  as: 'host_of'
});

Club.belongsToMany(Member, {
  through: {
    model: Memberlist,
    unique: false
  },
  as: 'members',
  foreignKey: 'club_id',
  otherKey: 'member_id'
});

Member.belongsToMany(Club, {
  through: {
    model: Memberlist,
    unique: false
  },
  as: 'clubs',
  foreignKey: 'member_id',
  otherKey: 'club_id'
});

module.exports = { Book, Club, Member, Library, Memberlist };
