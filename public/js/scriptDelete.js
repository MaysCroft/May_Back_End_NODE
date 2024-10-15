// SCRIPT DELETE

function getMessage(param) {
    const urlParams = new URLSearchParams(window.location. search);
    return urlParams.get(param);
}

const sucessDel = getMessage('sucessDel');
const errorDel = getMessage('errorDel');

if (sucessDel) {
    alert(decodeURIComponent(sucessDel));
    window.location.href = '/admin';
}

if (errorDel) {
    alert(decodeURIComponent(errorDel));
    window.location.href = '/admin';
}

function confirmDelete() {
    return confirm("Tem certeza que deseja EXCLUIR este Usuário?");
}