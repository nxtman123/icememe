
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('votes').del()
    .then(function () {
      // Inserts seed entries
      return knex('votes').insert([
        {
          user_id: 1,
          meme_id: 1,
          type: 'up'
        },
        {
          user_id: 2,
          meme_id: 1,
          type: 'up'
        },
        {
          user_id: 3,
          meme_id: 1,
          type: 'down'
        },
        {
          user_id: 4,
          meme_id: 2,
          type: 'up'
        },
        {
          user_id: 5,
          meme_id: 2,
          type: 'up'
        },
        {
          user_id: 6,
          meme_id: 3,
          type: 'up'
        },
        {
          user_id: 2,
          meme_id: 3,
          type: 'down'
        },
        {
          user_id: 1,
          meme_id: 4,
          type: 'up'
        }
      ]);
    });
};
