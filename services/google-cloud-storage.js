const storageCloud = require('@google-cloud/storage');
const path = require('path');
const { GOOGLE_CLOUD_KEYFILE, GOOGLE_CLOUD_PROJECT_ID, DEFAULT_BUCKET_NAME } = require('../configs');
const gcsHelpers = require('../helper/google-cloud-storage');

const storage = new storageCloud.Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: path.join(__dirname, GOOGLE_CLOUD_KEYFILE),
});

exports.sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);
    const gcsFileName = `${Date.now()}-${req.file.originalname}`;
    const file = bucket.file(gcsFileName);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });

    stream.on('error', err => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsFileName;

        return file.makePublic().then(() => {
            req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
            next();
        });
    });

    stream.end(req.file.buffer);
};
