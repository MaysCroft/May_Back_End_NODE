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
    alert(decodeURIComponent(errorEdit));
    window.location.href = '/admin';
}