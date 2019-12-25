const mongoose = require('../configs/db');
const User = require('./user');
const Room = require('./room');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserRoom = new Schema(
    {
        user: {
            type: ObjectId,
            ref: User,
            required: true,
        },
        room: {
            type: ObjectId,
            ref: Room,
            required: true,
        },
        status: { type: Boolean, default: false },
        type: { type: String, default: 'MEMBER' },
        created_by: {
            type: ObjectId,
            ref: User,
        },
        updated_by: {
            type: ObjectId,
            ref: User,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('UserRoom', UserRoom);
