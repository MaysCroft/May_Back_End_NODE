// UPLOADS

const multer = require('multer');
const path = require('path');

// Configurar o destino do arquivo de imagem(avatar)
const storage = multer.diskStorage({
    destination: function(res, file, cb) {
        cb(null, './uploads'); // Pasta onde serão armazenada as imagens
    },

    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Configurar Limite de Tamanho da Imagem
const upload = multer ({
    storage: storage,
    limits: { filesize: 1024 * 1024 * 5 } // Limite de 5MB
});

module.exports = upload;