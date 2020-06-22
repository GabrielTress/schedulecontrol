
exports.up = function(knex) {
    return knex.schema.createTable('atendente', function(table){
        table.increments('id_atend');
        table.string('nome', 60).notNullable();
        table.integer('comissao').notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('atendente');
  };