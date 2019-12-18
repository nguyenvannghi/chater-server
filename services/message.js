const { isEmpty } = require('lodash');
const { getLogicalQueryOperators } = require('../helper/mongo-format-operator');
const { ERROR_NAME } = require('../configs/const');
const MessageModel = require('../db/message');

const GET_MESSAGES = async (_root, args) => {
    const params = getLogicalQueryOperators(args.where);
    return await MessageModel.find(params)
        .populate([{ path: 'sender' }, { path: 'room' }, { path: 'created_by' }, { path: 'updated_by' }])
        .catch(err => new Error(err));
};

const GET_MESSAGE_DETAIL = async (_root, { _id }) => {
    return await MessageModel.findById(_id)
        .populate([{ path: 'sender' }, { path: 'room' }, { path: 'created_by' }, { path: 'updated_by' }])
        .catch(err => new Error(err));
};

const CREATE_MESSAGE = async (_root, { user_id, room_id, message_body, message_status, created_by }) => {
    if (isEmpty(user_id) || isEmpty(room_id)) {
        throw new Error(ERROR_NAME.REQUIRED_FIELD_MISSING);
    }

    const temp = {
        sender: user_id,
        room: room_id,
        message_body: message_body,
        message_status: message_status,
        created_by: created_by,
    };
    let message = await MessageModel.create(temp);
    return await message
        .populate([{ path: 'sender' }, { path: 'room', populate: { path: 'users' } }, { path: 'created_by' }, { path: 'updated_by' }])
        .execPopulate()
        .catch(err => new Error(err));
};

const UPDATE_MESSAGE = async (_root, { _id, message_body, message_status, updated_by }) => {
    if (isEmpty(_id)) {
        throw new Error(ERROR_NAME.REQUIRED_FIELD_MISSING);
    }
    const temp = {
        message_body: message_body,
        message_status: message_status,
        updated_by: updated_by,
    };
    let message = await MessageModel.findByIdAndUpdate(
        _id,
        {
            $set: temp,
        },
        {
            new: true,
        },
    );
    return await message
        .populate([{ path: 'sender' }, { path: 'room', populate: { path: 'users' } }, { path: 'created_by' }, { path: 'updated_by' }])
        .execPopulate()
        .catch(err => new Error(err));
};

module.exports = {
    GET_MESSAGES,
    GET_MESSAGE_DETAIL,
    CREATE_MESSAGE,
    UPDATE_MESSAGE,
};
