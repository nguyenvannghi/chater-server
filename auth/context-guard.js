module.exports.contextGuard = ({ req, connection }) => {
    if (connection) {
        // check connection for metadata
        return connection.context;
    } else {
        const tokenWithBearer = req.headers.authorization || '';
        authToken = tokenWithBearer.split(' ')[1];
        try {
            if (authToken) return { authToken };
        } catch (error) {
            throw new AuthenticationError('Authentication token is invalid, please log in');
        }
    }
};
