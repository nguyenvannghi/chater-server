const { isEmpty } = require('lodash');
const UserModel = require('../db/user');
const { CONSTANTS, ERROR_NAME } = require('../configs/const');
const { generateToken, verifyToken } = require('../helper/jwt');
const { getLogicalQueryOperators } = require('../helper/mongo-format-operator');

const GET_USERS = async (_root, args) => {
    const params = getLogicalQueryOperators(args.where);
    return await UserModel.find(params).catch(err => new Error(err));
};

const GET_USER_DETAIL = async (_root, { _id }) => {
    return await UserModel.findById(_id).catch(err => new Error(err));
};

const CREATE_USER = async (_root, args) => {
    const { username, email, password } = args;
    if (isEmpty(username) || isEmpty(email) || isEmpty(password)) {
        throw new Error(ERROR_NAME.REQUIRED_FIELD_MISSING);
    }
    let isEmailExists = await UserModel.findOne({
        email: email,
    });
    let isUsernameExists = await UserModel.findOne({
        username: username,
    });
    if (isEmailExists || isUsernameExists) {
        throw new Error(ERROR_NAME.ENTITY_ALREADY_EXISTS);
    }
    return await UserModel.create(args).catch(err => new Error(err));
};

const UPDATE_USER = async (_root, args) => {
    const { _id } = args;
    if (isEmpty(_id)) {
        throw new Error(ERROR_NAME.REQUIRED_FIELD_MISSING);
    }
    return await UserModel.findByIdAndUpdate(
        _id,
        {
            $set: args,
        },
        {
            new: true,
        },
    ).catch(err => new Error(err));
};

const LOGIN = async (_root, { username, password }) => {
    if (isEmpty(username) || isEmpty(password)) {
        throw new Error(ERROR_NAME.REQUIRED_FIELD_MISSING);
    }
    let user = await UserModel.findOne({ username: username });
    if (isEmpty(user)) {
        throw new Error(ERROR_NAME.USER_NOT_FOUND);
    }
    if (!user.comparePassword(password)) {
        throw new Error(ERROR_NAME.PASSWORD_INCORRECT);
    }
    return {
        token: generateToken({
            _id: user._id,
            username: user.username,
            email: user.email,
            age: user.age,
            is_active: user.is_active,
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
    return generateToken({ decodedToken });
};

module.exports = {
    GET_USERS,
    GET_USER_DETAIL,
    CREATE_USER,
    UPDATE_USER,
    LOGIN,
    REFRESH_TOKEN,
};
