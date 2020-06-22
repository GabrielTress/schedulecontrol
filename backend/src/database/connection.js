const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);  //em knex, seleciona o diretorio de desenvolvimento.

module.exports = connection;