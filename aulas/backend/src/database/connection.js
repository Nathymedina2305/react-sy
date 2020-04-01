// importando o knex
const knex = require('knex');

// importando as configs do bd
const configuration = require('../../knexfile');

// criando a conexão de desenvolvimento
const connection = knex(configuration.development);

// exportando a conexão com o bd
module.exports = connection;
