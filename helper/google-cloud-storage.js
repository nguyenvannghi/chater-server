const { STOREAGE_GOOGLE_API } = require('../configs');

exports.copyFileToGCS = (localFilePath, bucketName, options) => {
    options = options || {};
    const bucket = storage.bucket(bucketName);
    const fileName = path.basename(localFilePath);
    const file = bucket.file(fileName);

    return bucket
        .upload(localFilePath, options)
        .then(() => file.makePublic())
        .then(() => exports.getPublicUrl(bucketName, gcsName));
};

exports.getPublicUrl = (bucketName, fileName) => `${STOREAGE_GOOGLE_API}${bucketName}/${fileName}`;
