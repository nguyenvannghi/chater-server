const { isEmpty } = require('lodash');
const { getLogicalQueryOperators } = require('../helper/mongo-format-operator');
const { ERROR_NAME } = require('../configs/const');
const UserRoomModel = require('../db/userRoom');

const GET_USER_ROOMS = async (_root, args) => {
    const params = getLogicalQueryOperators(args.where);
    return await UserRoomModel.find(params)
        .populate('user')
        .populate('room')
        .populate('created_by')
        .populate('updated_by')
        .catch(err => new Error(err));
};
const CREATE_USER_ROOM = async (_root, { user, room, type, status, created_by }) => {
    if (isEmpty(user) || isEmpty(room)) {
        throw new Error(ERROR_NAME.REQUIRED_FIELD_MISSING);
    }
    let isExists = await UserRoomModel.findOne({
        user: user,
        room: room,
    });
    if (isExists) {
        throw new Error(ERROR_NAME.ENTITY_ALREAY_EXISTS);
    }

    const temp = {
        user: user,
        room: room,
        status: status,
        type: type,
        created_by: created_by,
    };
    let userRoom = await UserRoomModel.create(temp);
    return await userRoom
        .populate([{ path: 'user' }, { path: 'room' }, { path: 'created_by' }, { path: 'updated_by' }])
        .execPopulate()
        .catch(err => new Error(err));
};

const UPDATE_USER_ROOM = async (_root, args) => {
    const { _id } = args;
    if (isEmpty(_id)) {
        throw new Error(ERROR_NAME.REQUIRED_FIELD_MISSING);
    }
    let userRoom = await UserRoomModel.findByIdAndUpdate(
        _id,
        {
            $set: args,
        },
        {
            new: true,
        },
    );
    return await userRoom
        .populate([{ path: 'user' }, { path: 'room' }, { path: 'created_by' }, { path: 'updated_by' }])
        .execPopulate()
        .catch(err => new Error(err));
};

module.exports = {
    GET_USER_ROOMS,
    CREATE_USER_ROOM,
    UPDATE_USER_ROOM,
};
