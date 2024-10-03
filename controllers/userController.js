// USER CONTROLLER

const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Função para exibir a Página Inicial - index
exports.getIndex = (req, res) => {
    res.render('index');
};

// Função para exibir a Tela de Login
exports.getLogin = (req, res) => {
    res.render('login');
};

// Função para realizar o Login
exports.postLogin = async (req, res) => {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user && await bcrypt.compare(senha, user.senha)) {
        req.session.userId = user.id_usuario;
        req.session.userAcesso = user.acesso;

        res.redirect('/perfil?sucessLogin=Login+Realizado+com+Sucesso!!!');
    } else {
        res.redirect('/login?errorCad=Usuário+e+Senha+Inválidos!!!');
    }
};

// Função para exibir a Tela de Cadastro de Usuário
exports.getCadastrar = (req, res) => {
    res.render('cadastrar');
};

// Função para armazenar os dados dos usuários no banco
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