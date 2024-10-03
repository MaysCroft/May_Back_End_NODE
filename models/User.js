// USER

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {

    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    contato: {
        type: DataTypes.STRING,
        allowNull: false
    },

    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },

    acesso: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    },

    avatar: {
        type: DataTypes.STRING, // Armazenar o caminho da imagem no servidor
        allowNull: false
    },
}, { tableName: 'usuario' } );

module.exports = User;