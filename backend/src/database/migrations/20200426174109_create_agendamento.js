exports.up = function(knex) {
    return knex.schema.createTable('agendamento', function(table){
      table.increments('id_agend');
      table.integer('pessoa_id');
      table.integer('atendente_id');
      table.integer('login_id');
      table.integer('servico_id').notNullable();
      table.datetime('data_inicial');
      table.datetime('data_final');
      table.datetime('data_agendamento');
  
      table.foreign('pessoa_id').references('id_pes').inTable('pessoa');
      table.foreign('servico_id').references('id_serv').inTable('servico');
      table.foreign('login_id').references('id_login').inTable('login');
      table.foreign('atendente_id').references('id_atend').inTable('atendente');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('agendamento');
  };