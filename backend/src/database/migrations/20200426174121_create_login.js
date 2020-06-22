exports.up = function(knex) {
    return knex.schema.createTable('login', function(table){
        table.increments('id_login');
        table.string('nome', 60).notNullable();
        table.string('logon', 30).notNullable();
        table.string('senha', 20).notNullable();
        table.string('email', 60);
        table.string('telefone', 20);
        table.boolean('adm');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('login');
  };

