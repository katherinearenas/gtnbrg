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
  as: 'reading_list'
});

Club.belongsToMany(Book, {
  through: {
    model: Library,
    unique: false
  },
});

Club.hasOne(Member, {

})

Club.belongsToMany(Member, {
  through: {
    model: Memberlist,
    unique: false
  },
  as: 'member_list',
  foreignKey: 'club_id',
  otherKey: 'user_id'
});


module.exports = { Book, Club, Member, Library };
