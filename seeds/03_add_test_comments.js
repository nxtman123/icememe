
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          user_id: 1,
          meme_id: 2,
          text: 'such nice'
        },
        {
          user_id: 1,
          meme_id: 3,
          text: 'needs more drake'
        },
        {
          user_id: 2,
          meme_id: 3,
          text: 'such wow'
        },
        {
          user_id: 2,
          meme_id: 4,
          text: 'hehehe'
        },
        {
          user_id: 3,
          meme_id: 4,
          text: 'such great'
        },
        {
          user_id: 3,
          meme_id: 5,
          text: 'huh'
        },
        {
          user_id: 4,
          meme_id: 5,
          text: 'LOL'
        },
        {
          user_id: 4,
          meme_id: 6,
          text: 'sum1 explain'
        },
        {
          user_id: 5,
          meme_id: 6,
          text: 'LMAO'
        },
        {
          user_id: 5,
          meme_id: 1,
          text: 'ded'
        },
        {
          user_id: 6,
          meme_id: 1,
          text: 'nahhh'
        },
        {
          user_id: 6,
          meme_id: 2,
          text: 'hehe'
        }
      ]);
    });
};
