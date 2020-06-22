exports.up = function(knex) {
    return knex.schema.createTable('produto', function(table){
        table.increments('id_prod');
        table.varchar('cod_bar', 50);
        table.string('descricao', 60).notNullable();
        table.integer('quantidade').notNullable();
        table.integer('valor').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('produto');
};