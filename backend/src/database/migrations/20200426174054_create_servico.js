
exports.up = function(knex) {
    return knex.schema.createTable('servico', function(table){
        table.increments('id_serv');
        table.string('nome', 60).notNullable();
        table.integer('valor').notNullable();
        table.time('duracao');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('servico');
  };
  