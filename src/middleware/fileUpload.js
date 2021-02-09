const util = require("util");

const multer = require('multer');
const PATH = './assets/uploads/';

var destFolder = require('../utils/dest-folder');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, PATH + destFolder.getFolderName());
    },
    filename: (req, file, cb) => {
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

let uploadFile = multer({ storage: storage }).single("file");
let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;