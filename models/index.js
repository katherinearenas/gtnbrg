const Book = require('./Books');
const Club = require('./Clubs');
const Member = require('./Members');
const Library = require('./Libraries');
const Memberlist = require('./Memberlists')

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

Club.belongsTo(Member, {
  foreignKey: 'hostId',
  as: 'Host'
});


Club.belongsToMany(Member, {
  through: {
    model: Memberlist,
    unique: false

}
});

Member.belongsToMany(Club, {
  through: {
    model: Memberlist,
    unique: false

}
});


module.exports = { Book, Club, Member, Library };
