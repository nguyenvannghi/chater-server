const multer = require('multer');
const { UPDATE_DEST, STOREAGE_BUCKET } = require('../configs');
const gcsMiddlewares = require('./google-cloud-storage');

const init = app => {
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
        },
    });

    app.post('/photo', upload.single('photo'), gcsMiddlewares.sendUploadToGCS, (req, res, next) => {
        if (req.file && req.file.gcsUrl) {
            return res.send(req.file.gcsUrl);
        }
        return res.status(500).send('Unable to upload');
    });
};

module.exports = {
    init: init,
};
