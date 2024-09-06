const Book = require('./Books');
const Club = require('./Clubs');
const Member = require('./Members');
const Library = require('./Libraries');
const Memberlist = require('./Memberlists');

Book.belongsToMany(Member, {
  through: {
    model: Library,
    unique: false
  },
  as: 'collection'
});

Book.belongsToMany(Club, {
  through: {
    model: Library,
    unique: false
  },
  as: 'reading_list'
});

Club.belongsToMany(Member, {
  through: {
    model: Memberlist,
    unique: false
  },
  as: 'member_list',
  foreignKey: 'club_id',
  otherKey: 'user_id'
});

Member.belongsToMany(Club, {
  through: {
    model: Memberlist,
    unique: false
  },
  as: 'membership',
  foreignKey: 'user_id',
  otherKey: 'club_id'
});

module.exports = { Book, Club, Member, Library };
