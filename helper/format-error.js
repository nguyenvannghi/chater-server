const { ERROR_TYPE } = require('../configs/const');

const getErrorCode = errorName => {
    return ERROR_TYPE[errorName];
};

module.exports = getErrorCode;
