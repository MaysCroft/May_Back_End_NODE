// SCRIPT CAD

document.getElementById('cad').addEventListener('submit', (e) => {

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
    const urlParams = new URLSearchParams(window.location. search);
    return urlParams.get(msg);
}

const sucessCad = getMessage('sucessCad');
const errorCad = getMessage('errorCad');

// Se o cadastro for concluído, redireciona para a tela de Login
if (sucessCad) {
    alert(decodeURIComponent(sucessCad));
    window.location.href = '/login';
}

// Se o cadastro estiver errado, volta para a tela de Cadastro
if (errorCad) {
    alert(decodeURIComponent(errorCad));
    window.location.href = '/cadastrar';
}