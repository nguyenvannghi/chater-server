const jwt = require('jsonwebtoken');
const { SECRET_KEY, EXPIRES_IN } = require('../configs');
const CONSTANTS = require('../configs/const');

const verifyToken = token => jwt.verify(token, SECRET_KEY);

const generateToken = user =>
    jwt.sign(
        {
            email: user.email,
            username: user.username,
        },
        SECRET_KEY,
        { expiresIn: EXPIRES_IN },
    );

const isAuthorized = async (req, res, next) => {
    console.log('isAuthorized', req);
    if (!req.body.isAuthorized) {
        const tokenFromClient = req.body.token || req.query.token || req.headers['x-access-token'];
        if (tokenFromClient) {
            try {
                const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
                req.jwtDecoded = decoded;
                next();
            } catch (error) {
                throw new Error(CONSTANTS.UNAUTHORIZED);
            }
        } else {
            throw new Error(CONSTANTS.NO_TOKEN_PROVIDED);
        }
    } else {
        next();
    }
};

module.exports = {
    generateToken,
    verifyToken,
    isAuthorized,
};
