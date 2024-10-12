// USER CONTROLLER

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// Função para Exibir a Página Inicial - Index
exports.getIndex = (req, res) => {
    res.render('index');
};

// Função para Exibir a Tela de Login
exports.getLogin = (req, res) => {
    res.render('login');
};

// Função para Realizar o Login
exports.postLogin = async (req, res) => {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user && await bcrypt.compare(senha, user.senha)) {
        req.session.userId = user.id_usuario;
        req.session.userAcesso = user.acesso;
        req.session.userName = user.nome;

        if (user.acesso === 'admin') {
            res.redirect('/login?sucessLoginAdmin=Login+Realizado+com+Sucesso!!!');
        } else {
            res.redirect('/login?sucessLoginUser=Login+Realizado+com+Sucesso!!!');
        }

    } else {
        res.redirect('/login?errorLogin=Usuário+e+Senha+Inválidos!!!');
    }
};

// Função para Exibir a Tela de Perfil do Usuário
exports.getPerfil = (req, res) => {
    res.render('perfil', { userName: req.session.userName });
};

// Função para Exibir a Tela de Admin do Usuário
exports.getAdmin = async (req, res) => {
    const users = await User.findAll(); // SELECT * FROM usuarios - Seleciona todos os usuários cadastrados
    res.render('admin', { users, userName: req.session.userName });
};

// Função para Exibir a Tela de Cadastro de Usuário
exports.getCadastrar = (req, res) => {
    res.render('cadastrar');
};

// Função para Armazenar os Dados dos Usuários no Banco
exports.postCadastrar = async (req, res) => {
    
    const { nome, email, contato, senha } = req.body;
    const avatar = req.file ? req.file.filename : null; // Pegar o nome da Imagem

    try {
        const senhaHash = bcrypt.hashSync(senha, 10);
        await User.create({ nome, email, contato, senha: senhaHash, avatar });

        console.log('Usuário Cadastrado com Sucesso!!!');
        res.redirect('/cadastrar?sucessCad=Usuário+Cadastrado+com+Sucesso!!!');
    } catch (error) {
        console.error(error);
        res.redirect('/cadastrar?errorCad=Erro+ao+tentar+Cadastrar+Usuário!!!');
    }
};

// Função para Exibir a tela de Editar o Usuário
exports.getEditUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId); // SELECT * FROM usuario WHERE id_usuario = userId
        res.render('editUser', { user });
    } catch (error) {
        console.error(error);
        res.render('/admin', { user:[], error: 'Erro ao Carregar Usuário'});
    }
};

// Função para Editar as Informações do Usuário
exports.postEditUser = async (req, res) => {
    const userId = req.params.id;
    const { nome, email, contato, senha } = req.body;

    try {
        const senhaHash = bcrypt.hashSync(senha, 10);
        const user = await User.findByPk(userId); // SELECT * FROM usuario WHERE id_usuario = userId

        let novaImagem;
        if (req.file) {
            // Se houver uma imagem, use o nome da nova imagem
            novaImagem = req.file.filename;

            // Removendo a Imagem Antiga, se houver
            if (user.avatar) {
                const imagemAntiga = path.join(__dirname, '../uploads', user.avatar); // Verifica de o Path existe

                if (fs.existsSync(imagemAntiga)) {
                    console.log(imagemAntiga);
                    fs.unlinkSync(imagemAntiga); // Remove a Imagem Antiga       
                } else {
                    console.log(`Arquivo não Encontrado: ${imagemAntiga}`);
                    
                }
            }
        } else {
            // Se nehuma nova image for enviada, mantenha a imagem existente
            novaImagem = user.avatar;
        }

        await User.update (
            { nome, email, contato, senha:senhaHash, avatar:novaImagem }, 
            { where: { id_usuario: userId } }
        );

        res.redirect(`/edit/${req.params.id}?sucessEdit=Usuário+Alterado+com+Sucesso!!!`);
        console.log('Usuário Alterado com Sucesso!!!');
        
    } catch (error) {
        console.error(error);
        res.redirect(`/edit/${req.params.id}?errorEdit=Erro+ao+Alterar+Usuário!!!`);
    }
};

// Função para Excluir as Informações do Usuário
exports.getDeleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        res.render('index', { user });
    } catch (error) {
        console.error(error);
        res.render('/admin', { user:[], error: 'Erro ao Deletar Usuário'});
    }
};

exports.postDeleteUser = async (req, res) => {
    try {
        await User.destroy( { where: {id_usuario: req.params.id} } );
        res.redirect(`/admin?sucessDel=Usuário+excluído+com+sucesso`);
    } catch (err) {
        console.error(err);
        res.redirect(`/admin?errorDel=Erro+ao+excluir+usuário`);
    }
};

// Função para sair do Sistema (Perfil ou Admin) - LOGOUT
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};