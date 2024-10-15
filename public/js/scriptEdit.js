// SCRIPT EDIT

document.getElementById('edit').addEventListener('submit', (e) => {

    let senha = document.getElementById('senha').value;
    let confSenha = document.getElementById('confSenha').value;

    // alert(senha + " " + confSenha);

    //Enquanto o usuário não informar as senhas iguais do cadastro não é realizado
    if (senha !== confSenha) {
        alert("As senhas informadas são diferentes!");
        e.preventDefault(); // return false;
    }
});

// Função para exibir ao usuário que o cadastro foi realizado com sucesso
function getMessage(msg) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(msg);
}

const sucessEdit = getMessage('sucessEdit');
const errorEdit = getMessage('errorEdit');

// Se o cadastro for concluído, redireciona para a tela de Login
if (sucessEdit) {
    alert(decodeURIComponent(sucessEdit));
    window.location.href = '/admin';
}

// Se o cadastro estiver errado, volta para a tela de Cadastro
if (errorEdit) {
    alert(decodeURIComponent(errorEdit));
    window.location.href = '/admin';
}