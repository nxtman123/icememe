
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('user_id');
    table.string('username', 20).notNullable();
    table.string('password', 100).notNullable();
    table.string('email', 50).notNullable();
    table.timestamp('date_created').defaultTo(knex.fn.now());

    table.unique('username');
    table.unique('email');
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
}

/*
CREATE TABLE IF NOT EXISTS users (
	user_id			INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username		VARCHAR(20) NOT NULL,
    `password`  	VARCHAR(100) NOT NULL,
    email			VARCHAR(50) NOT NULL,
    date_created	TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user UNIQUE(username),
    CONSTRAINT unique_umail UNIQUE(email)
);
*/
