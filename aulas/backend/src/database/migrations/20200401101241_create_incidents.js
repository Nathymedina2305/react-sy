// criando a tabela
// o increments incrementa o numero 1,2,3,...
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments();
       
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs');

  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};


/**
 * DICA: CASO PRECISE VOLTAR ALGO QUE JA RODEI NO DB SÓ RODA O COMANDO 'NPX KNEX MIGRATE:ROLLBACK' 
 * ELE DESFAZ A ULTIMA MIGRATE
 */

 /**
  * NPX KNEX MOSTRA TODOS OS COMANDOS Q VC PRECISA
  */