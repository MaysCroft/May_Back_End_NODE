// SCRIPT LOGIN

// Função para exibir ao usuário que o cadastro foi realizado com sucesso
function getMessage(msg) {
    const urlParams = new URLSearchParams(window.location. search);
    return urlParams.get(msg);
}

const sucessLogin = getMessage('sucessLogin');
const errorLogin = getMessage('errorLogin');

// Se o cadastro for concluído, redireciona para a tela de Login
if (sucessLogin) {
    alert(decodeURIComponent(sucessLogin));
    window.location.href = '/perfil';
}

// Se o cadastro estiver errado, volta para a tela de Cadastro
if (errorLogin) {
    alert(decodeURIComponent(errorLogin));
    window.location.href = '/login';
}