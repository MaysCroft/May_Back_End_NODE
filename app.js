// APP

const express = require('express');
const session = require('express-session');
const sequelize = require ('./config/database');
const userRotas = require('./routes/userRotas');
const path = require('path');
const PORTA = 3000;

const app = express();

// Middleware para codificar os arquivos e não permitir .html
app.use(express.urlencoded( { extended:false } ));
app.use(express.json());

// Acesso a pasta Public onde fica os arquivos e pastas JS e CSS
app.use(express.static(path.join(__dirname, 'public')));

// Acesso a pasta Uploads onde fica os arquivos de imagem
app.use('/uploads', express.static('uploads'));

// Criar sessões de usuários no sistema
app.use(session({
    secret:'senai456',
    resave: false,
    saveUninitialized: true
}));

// Utilizando rotas de acesso as páginas ejs(html)
app.set('view engine', 'ejs');

// Sincronizando o Banco de Dados com Sequelize(ORM)
sequelize.sync()
         .then(console.log('Banco de Dados Conectado com Sucesso!'))
         .catch(error => console.error(`${error}: Não foi possível Conectarao Banco de Dados!`));

// Permissão para acesso as rotas
app.use(userRotas);

app.listen(PORTA, () => {
    console.log(`Servidor Rodando em http://localhost:${PORTA}`);
});