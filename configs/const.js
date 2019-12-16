module.exports = {
    TOKEN_ERROR: 'TOKEN_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    NO_TOKEN_PROVIDED: 'NO_TOKEN_PROVIDED',
};

module.exports.ERROR_NAME = {
    ENTITY_ALREADY_EXISTS: 'ENTITY_ALREADY_EXISTS',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    PASSWORD_INCORRECT: 'PASSWORD_INCORRECT',
    REQUIRED_FIELD_MISSING: 'REQUIRED_FIELD_MISSING',
    SERVER_ERROR: 'SERVER_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
};

module.exports.ERROR_TYPE = {
    REQUIRED_FIELD_MISSING: {
        message: 'Required field missing',
        statusCode: 403,
    },
    USER_NOT_FOUND: {
        message: 'User is not found',
        statusCode: 403,
    },
    PASSWORD_INCORRECT: {
        message: 'Password incorrect',
        statusCode: 403,
    },
    ENTITY_ALREADY_EXISTS: {
        message: 'Entity already existed.',
        statusCode: 403,
    },
    SERVER_ERROR: {
        message: 'Server error.',
        statusCode: 500,
    },
    UNAUTHORIZED: {
        message: 'You are not authenticated.',
        statusCode: 401,
    },
};
