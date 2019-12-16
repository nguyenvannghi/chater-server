const { isEmpty } = require('lodash');
const { verifyToken } = require('../helper/jwt');
const { ERROR_NAME } = require('../configs/const');
module.exports.authenticated = next => async (root, args, context, info) => {
    try {
        const token = context.authToken;
        let decoded = await verifyToken(token);
        if (!isEmpty(decoded)) {
            return next(root, args, context, info);
        }
    } catch (error) {
        throw new Error(ERROR_NAME.UNAUTHORIZED);
    }
};
