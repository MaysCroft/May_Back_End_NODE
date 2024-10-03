// ROUTES

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');

// Rotas para abrir as páginas no servidor
router.get('/', userController.getIndex); // Index
router.get('/login', userController.getLogin); // Login
router.get('/cadastrar', userController.getCadastrar); // Cadastrar

// Rotas para cadastrar e logar Usuário no Banco
router.post('/login', userController.postLogin);
router.post('/cadastrar', upload.single('avatar'), userController.postCadastrar);

module.exports = router;