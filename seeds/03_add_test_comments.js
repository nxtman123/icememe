
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          comment_id: 1, 
          user_id: 1,
          meme_id: 2,
          text: 'such nice'
        },
        {
          comment_id: 2, 
          user_id: 1,
          meme_id: 3,
          text: 'needs more drake'
        },
        {
          comment_id: 3, 
          user_id: 2,
          meme_id: 3,
          text: 'such wow'
        },
          comment_id: 4, 
          user_id: 2,
          meme_id: 4,
          text: 'hehehe'
        },
        {
          comment_id: 5, 
          user_id: 3,
          meme_id: 4,
          text: 'such great'
        },
        {
          comment_id: 6, 
          user_id: 3,
          meme_id: 5,
          text: 'huh'
        },
        {
          comment_id: 7, 
          user_id: 4,
          meme_id: 5,
          text: 'LOL'
        },
        {
          comment_id: 8, 
          user_id: 4,
          meme_id: 6,
          text: 'sum1 explain'
        },
        {
          comment_id: 9, 
          user_id: 5,
          meme_id: 6,
          text: 'LMAO'
        },
        {
          comment_id: 10, 
          user_id: 5,
          meme_id: 1,
          text: 'ded'
        },
        {
          comment_id: 11, 
          user_id: 6,
          meme_id: 1,
          text: 'nahhh'
        },
        {
          comment_id: 12, 
          user_id: 6,
          meme_id: 2,
          text: 'hehe'
        }
      ]);
    });
};
