exports.up = function(knex) {
    return knex.schema.createTable('pessoa', function(table){
        table.increments('id_pes');
        table.string('nome', 60).notNullable();
        table.string('email', 60);
        table.string('telefone', 20);
        table.string('cidade', 30).notNullable();
        table.string('uf', 2).notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('pessoa');
  };
  
