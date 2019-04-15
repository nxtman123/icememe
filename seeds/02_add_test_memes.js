
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('memes').del()
    .then(function () {
      // Inserts seed entries
      return knex('memes').insert([
        {
          user_id: 1,
          title: 'Adam\'s meme',
          cloudinary_url: 'https://i.imgflip.com/2xi8c8.jpg'
        },
        {
          user_id: 2,
          title: 'Adnan\'s meme',
          cloudinary_url: 'https://i.imgflip.com/2tx3fo.jpg'
        },
        {
          user_id: 3,
          title: 'Amair\'s meme',
          cloudinary_url: 'https://i.kym-cdn.com/entries/icons/original/000/021/311/free.jpg'
        },
        {
          user_id: 4,
          title: 'Farzam\'s meme',
          cloudinary_url: 'https://i.kym-cdn.com/photos/images/original/001/469/681/ed2.jpg'
        },
        {
          user_id: 5,
          title: 'Flora\'s meme',
          cloudinary_url: 'https://i.kym-cdn.com/photos/images/newsfeed/001/004/013/679.jpg'
        },
        { 
          user_id: 6,
          title: 'Kurtis\' meme',
          cloudinary_url: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg'
        }
      ]);
    });
};
