// CHECAR ACESSO

module.exports.isAdmin = (req, res, next) => {
    if (req.session.username = 'admin') {
        return next(); // Se o usuário for admin, acessa o admin.
    } else {
        return res.status(403).send('Acesso Negado!!!, você não possui permissão de Admin! <a href="/login"> Voltar </a>');
    }
};

module.exports.isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next(); // Se o ID do usuário for válido, acessa o perfil.
    } else {
        return res.status(403).send('Acesso Negado!!!, você não realizou o Login! <a href="/login"> Voltar </a>');
    }
};