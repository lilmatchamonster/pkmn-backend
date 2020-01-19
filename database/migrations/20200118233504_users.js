
exports.up = function(knex) {

  return knex.schema.createTable('users',table => {
    table.increments(); //ID
    table.string('username', 25)
      .notNullable()
      .unique();
    table.string('password', 255)
      .notNullable()
  })
  .createTable('decks', table => {
    table.increments(); //ID
    table.string('deck'); //Might be an array says knex docs
    table.integer('userId') // Foreign Key to users table
      .references('id')
      .inTable('users')
      .notNullable() // A deck can not exist without a user
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('decks').dropTableIfExists('users');
};
