
exports.up = knex => knex.schema.createTable('votes', (table) => {
  table.increments('vote_id');
  table.integer('user_id').notNullable();
  table.integer('meme_id').notNullable();
  table.enu('type', ['up', 'down']).notNullable();
  table.timestamp('date_created').defaultTo(knex.fn.now());

  table.unique(['user_id', 'meme_id']);
  table.foreign('user_id').references('user_id').inTable('users').onDelete('cascade')
    .onUpdate('cascade');
  table.foreign('meme_id').references('meme_id').inTable('memes').onDelete('cascade')
    .onUpdate('cascade');
});

exports.down = knex => knex.schema.dropTable('votes');

/*
CREATE TABLE IF NOT EXISTS votes (
  vote_id       INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id       INT NOT NULL,
  meme_id       INT NOT NULL,
  `type`        ENUM('up', 'down') NOT NULL,
  date_created  TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT unique_user_vote UNIQUE(user_id, meme_id),
  CONSTRAINT fk_user_votes FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_meme_votes FOREIGN KEY (meme_id) REFERENCES memes(meme_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
*/
