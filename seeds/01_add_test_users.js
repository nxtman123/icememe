
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'akerr',
          password: '$2b$10$ycRJ5q8oUB5ULBSaa2FHQeEnprtb9tvp.0jefpPmUuQmS2nZthqKS',
          email: 'akerr@icememe.com'
        },
        {
          username: 'ahusain',
          password: '$2b$10$ycRJ5q8oUB5ULBSaa2FHQeEnprtb9tvp.0jefpPmUuQmS2nZthqKS',
          email: 'ahusain@icememe.com'
        },
        {
          username: 'ajavaid',
          password: '$2b$10$ycRJ5q8oUB5ULBSaa2FHQeEnprtb9tvp.0jefpPmUuQmS2nZthqKS',
          email: 'ajavaid@icememe.com'
        },
        {
          username: 'fnoori',
          password: '$2b$10$ycRJ5q8oUB5ULBSaa2FHQeEnprtb9tvp.0jefpPmUuQmS2nZthqKS',
          email: 'fnoori@icememe.com'
        },
        {
          username: 'fmoon',
          password: '$2b$10$ycRJ5q8oUB5ULBSaa2FHQeEnprtb9tvp.0jefpPmUuQmS2nZthqKS',
          email: 'fmoon@icememe.com'
        },
        {
          username: 'kjantzen',
          password: '$2b$10$ycRJ5q8oUB5ULBSaa2FHQeEnprtb9tvp.0jefpPmUuQmS2nZthqKS',
          email: 'kjantzen@icememe.com'
        }
      ]);
    });
};
