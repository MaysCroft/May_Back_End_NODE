// DATABASE

const { Sequelize } = require('sequelize');

const DATABASE = 'sistema_crud';
const USERNAME = 'root';
const SENHA = '';
const SERVIDOR = 'localhost';
const DRIVER = 'mysql';

const sequelize = new Sequelize(DATABASE, USERNAME, SENHA, {
    host: SERVIDOR, 
    dialect: DRIVER
});

module.exports = sequelize;