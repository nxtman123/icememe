
exports.up = function(knex, Promise) {
  return knex.schema.withSchema('public').createTable('memes', function(table) {
    table.increments('meme_id');
    table.integer('user_id').notNullable();
    table.string('title', 50).notNullable();
    table.string('cloudinary_url', 100).notNullable();
    table.timestamp('date_created').defaultTo(knex.fn.now());

    table.unique('cloudinary_url');
    table.foreign('user_id').references('user_id').inTable('users').onDelete('cascade').onUpdate('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('memes');
};

/*
CREATE TABLE IF NOT EXISTS memes (
	meme_id 		INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id			INT NOT NULL,
    title			VARCHAR(50) NOT NULL,
    cloudinary_url	VARCHAR(100) NOT NULL,
    date_created 	TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_cloudurl UNIQUE(cloudinary_url),
    CONSTRAINT fk_user_memes FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
*/