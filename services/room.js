const { isEmpty } = require('lodash');
const { getLogicalQueryOperators } = require('../helper/mongo-format-operator');
const { ERROR_NAME } = require('../configs/const');
const RoomModel = require('../db/room');

const GET_ROOMS = async (_root, args) => {
    const params = getLogicalQueryOperators(args.where);
    return await RoomModel.find(params)
        .populate('users')
        .populate('owners')
        .populate('created_by')
        .populate('updated_by')
        .catch(err => new Error(err));
};
const GET_ROOM_DETAIL = async (_root, { _id }) => {
    return await RoomModel.findById(_id)
        .populate('users')
        .populate('owners')
        .populate('created_by')
        .populate('updated_by')
        .catch(err => new Error(err));
};

const CREATE_ROOM = async (_root, { users, owners, name, description, topic, image_url, created_by, is_private }) => {
    if (isEmpty(name)) {
        throw new Error(ERROR_NAME.REQUIRED_FIELD_MISSING);
    }
    let isNameExists = await RoomModel.findOne({
        name: name,
    });
    if (isNameExists) {
        throw new Error(ERROR_NAME.ENTITY_ALREAY_EXISTS);
    }

    const temp = {
        users: users,
        owners: owners,
        name: name,
        description: description ? description : '',
        topic: topic ? topic : '',
        image_url: image_url ? image_url : '',
        created_by: created_by,
        is_private: is_private ? is_private : false,
    };
    return await RoomModel.create(temp).catch(err => new Error(err));
};

const UPDATE_ROOM = async (_root, args) => {
    const { _id } = args;
    if (isEmpty(_id)) {
        throw new Error(ERROR_NAME.REQUIRED_FIELD_MISSING);
    }
    return await RoomModel.findByIdAndUpdate(
        _id,
        {
            $set: args,
        },
        {
            new: true,
        },
    ).catch(err => new Error(err));
};

module.exports = {
    GET_ROOMS,
    GET_ROOM_DETAIL,
    CREATE_ROOM,
    UPDATE_ROOM,
};
