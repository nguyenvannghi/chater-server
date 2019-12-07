module.exports.contextGuard = ({ req }) => {
    const tokenWithBearer = req.headers.authorization || '';
    authToken = tokenWithBearer.split(' ')[1];
    return { authToken };
};
