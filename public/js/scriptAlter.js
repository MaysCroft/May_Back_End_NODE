// SCRIPT ALTER

function getMessage(param) {
    const urlParams = new URLSearchParams(window.location. search);
    return urlParams.get(param);
}

const sucessAlt = getMessage('sucessAlt');
const errorAlt = getMessage('errorAlt');

if (sucessAlt) {
    alert(decodeURIComponent(sucessAlt));
    window.location.href = '/admin';
}

if (errorAlt) {
    alert(decodeURIComponent(errorAlt));
    window.location.href = '/admin';
}

function confirmAlter() {

    if (usuario.acesso === 'admin') {
        usuario.acesso = 'user';
    } else {
        usuario.acesso = 'admin';
    }
    
    return confirm("Tem certeza que deseja ALTERAR as permissões deste Usuário?");
}