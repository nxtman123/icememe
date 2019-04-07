
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          user_id: 1,
          username: 'akerr',
          password: '$argon2i$v=19$m=4096,t=3,p=1$MvjTqlDPssFNFbbZOLqeGg$r1VWdGURCN06Iedv8GESQ/o+Am07QhqwpVfz4BhrNYQ',
          email: 'akerr@icememe.com'
        },
        {
          user_id: 2,
          username: 'ahusain',
          password: '$argon2i$v=19$m=4096,t=3,p=1$StLOuZR6Gnsxxp+emRRBKg$e5nEhe0tRhV+OluybgSeXozLm9eGF1bzahfxN3jUaa8',
          email: 'ahusain@icememe.com'
        },
        {
          user_id: 3,
          username: 'ajavaid',
          password: '$argon2i$v=19$m=4096,t=3,p=1$javmqYsZNxEk6ieK0BqKVw$X9z6+bXP/Zjb3/xTWLMQXSLk/Y1AOm3UD8BxMTpsad8',
          email: 'ajavaid@icememe.com'
        },
        {
          user_id: 4,
          username: 'fnoori',
          password: '$argon2i$v=19$m=4096,t=3,p=1$sj2HDN4XC2fRL2DNQMUsQA$p/h3JfrkHPSijZzLsCblcWT8SeSlFNE5X+0xVFwkAec',
          email: 'fnoori@icememe.com'
        },
        {
          user_id: 5,
          username: 'fmoon',
          password: '$argon2i$v=19$m=4096,t=3,p=1$UTHOuk2kiomTokKtNuBIag$+2vCxOzkqgfDnFk3tf+SBsVnFJRFRIW3biycKtdvjhc',
          email: 'fmoon@icememe.com'
        },
        {
          user_id: 6,
          username: 'kjantzen',
          password: '$argon2i$v=19$m=4096,t=3,p=1$br0EM3u2uz7Jp1IaoMnkOA$WNbhYbPzLjUTJmC9z+8o9YjEBK6Yyp5sb3iu4ESVu68',
          email: 'kjantzen@icememe.com'
        }
      ]);
    });
};
