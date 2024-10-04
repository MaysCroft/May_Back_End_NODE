// SCRIPT LOGIN

// Função se o usuário for logado com sucesso 
function getMessage(msg) {
    const urlParams = new URLSearchParams(window.location. search);
    return urlParams.get(msg);
}

const sucessLoginUser = getMessage('sucessLoginUser');
const sucessLoginAdmin = getMessage('sucessLoginAdmin');
const errorLogin = getMessage('errorLogin');

if (sucessLoginUser) {
    alert(decodeURIComponent(sucessLoginUser));
    window.location.href = '/perfil';
}

if (sucessLoginAdmin) {
    alert(decodeURIComponent(sucessLoginAdmin));
    window.location.href = '/admin';
}

if (errorLogin) {
    alert(decodeURIComponent(errorLogin));
    window.location.href = '/login';
}