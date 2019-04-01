
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('memes').del()
    .then(function () {
      // Inserts seed entries
      return knex('memes').insert([
        {
          meme_id: 1, 
          user_id: 1,
          title: 'Adams meme',
          cloudinary_url: ''
        },
        {
          meme_id: 2, 
          user_id: 2,
          title: 'Adnans meme',
          cloudinary_url: ''
        },
        {
          meme_id: 3, 
          user_id: 3,
          title: 'Amairs meme',
          cloudinary_url: ''
        },
        {
          meme_id: 4, 
          user_id: 4,
          title: 'Farzams meme',
          cloudinary_url: ''
        },
        {
          meme_id: 5, 
          user_id: 5,
          title: 'Floras meme',
          cloudinary_url: ''
        },
        {
          meme_id: 6, 
          user_id: 6,
          title: 'Kurtis meme',
          cloudinary_url: ''
        }
      ]);
    });
};
