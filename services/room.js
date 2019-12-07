const { isEmpty } = require('lodash');
const RoomModel = require('../db/room');

const GET_ROOMS = async (_root, _args) => {
    return await RoomModel.find({})
        .populate('users')
        .populate('created_by')
        .populate('updated_by')
        .catch(err => new Error(err));
};
const GET_ROOM_DETAIL = async (_root, { _id }) => {
    return await RoomModel.findById(_id)
        .populate('users')
        .populate('created_by')
        .populate('updated_by')
        .catch(err => new Error(err));
};

const CREATE_ROOM = async (_root, { users, name, description, topic, image_url, created_by, is_private }) => {
    if (isEmpty(name)) {
        throw new Error('REQUIRED_FIELD_MISSING');
    }
    let isNameExists = await RoomModel.findOne({
        name: name,
    });
    if (isNameExists) {
        throw new Error('ENTITY_ALREAY_EXISTS');
    }

    const temp = {
        users: users,
        name: name,
        description: description,
        topic: topic,
        image_url: image_url,
        created_by: created_by,
        is_private: is_private,
    };
    return await RoomModel.create(temp).catch(err => new Error(err));
};

const UPDATE_ROOM = async (_root, { _id, users, name, description, topic, image_url, updated_by, is_private }) => {
    if (isEmpty(_id)) {
        throw new Error('REQUIRED_FIELD_MISSING');
    }
    const temp = {
        users: users,
        name: name,
        description: description,
        topic: topic,
        image_url: image_url,
        updated_by: updated_by,
        is_private: is_private,
    };
    return await RoomModel.findByIdAndUpdate(
        _id,
        {
            $set: temp,
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
