
exports.up = knex => knex.schema.createTable('comments', (table) => {
  table.increments('comment_id');
  table.integer('user_id').notNullable();
  table.integer('meme_id').notNullable();
  table.string('text', 200).notNullable();
  table.timestamp('date_created').defaultTo(knex.fn.now());

  table.foreign('user_id').references('user_id').inTable('users').onDelete('cascade')
    .onUpdate('cascade');
  table.foreign('meme_id').references('meme_id').inTable('memes').onDelete('cascade')
    .onUpdate('cascade');
});

exports.down = knex => knex.schema.dropTable('comments');

/*
CREATE TABLE IF NOT EXISTS comments (
  comment_id    INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id       INT NOT NULL,
  meme_id       INT NOT NULL,
  `text`        VARCHAR(200) NOT NULL,
  date_created  TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_user_comments FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_meme_comments FOREIGN KEY (meme_id) REFERENCES memes(meme_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
*/
