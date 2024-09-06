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


  as: 'reading_list'
});

Club.haveMany(Book, {
  through: {
    model: Library,
    unique: false
  },
});

Club.haveOne(Member, {
  as: 'host'
})

Club.haveMany(Member, {
  through: {
    model: Memberlist,
    unique: false
  },
  as: 'member_list'
});


module.exports = { Book, Club, Member, Library };
