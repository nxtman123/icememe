
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          user_id: 1,
          username: 'akerr',
          password: 'akerr',
          email: 'akerr@icememe.com'
        },
        {
          user_id: 2,
          username: 'ahusain',
          password: 'ahusain',
          email: 'ahusain@icememe.com'
        },
        {
          user_id: 3,
          username: 'ajavaid',
          password: 'ajavaid',
          email: 'ajavaid@icememe.com'
        },
        {
          user_id: 4,
          username: 'fnoori',
          password: 'fnoori',
          email: 'fnoori@icememe.com'
        },
        {
          user_id: 5,
          username: 'fmoon',
          password: 'fmoon',
          email: 'fmoon@icememe.com'
        },
        {
          user_id: 6,
          username: 'kjantzen',
          password: 'kjantzen',
          email: 'kjantzen@icememe.com'
        }
      ]);
    });
};
