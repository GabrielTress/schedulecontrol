exports.up = function(knex) {
    return knex.schema.createTable('venda', function(table){
        table.increments('id_vend');
        table.integer('produto_id').notNullable();
        table.integer('pessoa_id').notNullable();
        table.integer('quantidade').notNullable();
        table.integer('valor').notNullable();
        table.integer('total').notNullable();
        table.datetime('data_venda').notNullable();
        table.string('status', 20).notNullable();
  
  
        table.foreign('produto_id').references('id_prod').inTable('produto');
        table.foreign('pessoa_id').references('id_pes').inTable('pessoa');
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('venda');
    
  };
