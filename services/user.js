const { isEmpty } = require('lodash');
const UserModel = require('../db/user');
const CONSTANTS = require('../configs/const');
const { generateToken, verifyToken } = require('../helper/jwt');

const GET_USERS = async (_root, _args) => {
    return await UserModel.find().catch(err => new Error(err));
};

const GET_USER_DETAIL = async (_root, { _id }) => {
    return await UserModel.findById(_id).catch(err => new Error(err));
};

const CREATE_USER = async (_root, { username, email, password, is_active }) => {
    if (isEmpty(username) || isEmpty(email) || isEmpty(password)) {
        throw new Error(CONSTANTS.REQUIRED_FIELD_MISSING);
    }
    let isEmailExists = await UserModel.findOne({
        email: email,
    });
    let isUsernameExists = await UserModel.findOne({
        username: username,
    });
    if (isEmailExists || isUsernameExists) {
        throw new Error(CONSTANTS.ENTITY_ALREAY_EXISTS);
    }

    const temp = {
        username: username,
        email: email,
        password: password,
        is_active: is_active,
    };
    return await UserModel.create(temp).catch(err => new Error(err));
};

const UPDATE_USER = async (_root, { _id, password, is_active }) => {
    if (isEmpty(_id)) {
        throw new Error(CONSTANTS.REQUIRED_FIELD_MISSING);
    }
    const temp = {
        password: password,
        is_active: is_active,
    };
    return await UserModel.findByIdAndUpdate(
        _id,
        {
            $set: temp,
        },
        {
            new: true,
        },
    ).catch(err => new Error(err));
};

const LOGIN = async (_root, { username, password }) => {
    if (isEmpty(username) || isEmpty(password)) {
        throw new Error(CONSTANTS.REQUIRED_FIELD_MISSING);
    }
    let user = await UserModel.findOne({ username: username });
    if (isEmpty(user)) {
        throw new Error(CONSTANTS.USE_NOT_FOUND);
    }
    if (!user.comparePassword(password)) {
        throw new Error(CONSTANTS.PASSWORD_INCORRECT);
    }
    return {
        token: generateToken({
            email: user.email,
            username: user.username,
        }),
        user: user,
    };
};

const REFRESH_TOKEN = async (_root, { token }) => {
    if (isEmpty(token)) {
        throw new Error(CONSTANTS.REQUIRED_FIELD_MISSING);
    }
    let decodedToken = await verifyToken(token);
    if (isEmpty(decodedToken)) {
        throw new Error(CONSTANTS.TOKEN_ERROR);
    }
    return generateToken({
        email: decodedToken.email,
        username: decodedToken.username,
    });
};

module.exports = {
    GET_USERS,
    GET_USER_DETAIL,
    CREATE_USER,
    UPDATE_USER,
    LOGIN,
    REFRESH_TOKEN,
};
