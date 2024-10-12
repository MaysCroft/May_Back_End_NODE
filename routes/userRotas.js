// ROUTES

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');
const checarAcesso = require('../middleware/checarAcesso');

// Rotas para Abrir as Páginas no Servidor
router.get('/', userController.getIndex);              // Index
router.get('/login', userController.getLogin);         // Login
router.get('/logout', userController.logout);          // Logout
router.get('/cadastrar', userController.getCadastrar); // Cadastrar
router.get('/perfil', checarAcesso.isAuthenticated, userController.getPerfil); // Perfil
router.get('/admin', checarAcesso.isAdmin, userController.getAdmin);           // Admin

// Rotas para Exibir, Editar e Excluir o Usuário
router.get('/edit/:id', checarAcesso.isAdmin, userController.getEditUser);
router.post('/edit/:id', checarAcesso.isAdmin, upload.single('avatar'), userController.postEditUser);

router.get('/delet/:id', checarAcesso.isAdmin, userController.getDeleteUser);
router.post('/delet/:id', checarAcesso.isAdmin, userController.postDeleteUser);

// Rotas para Cadastrar e Logar Usuário no Banco
router.post('/login', userController.postLogin);
router.post('/cadastrar', upload.single('avatar'), userController.postCadastrar);

module.exports = router;