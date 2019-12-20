const mongoose = require('../configs/db');
const User = require('./user');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const FriendShip = new Schema(
    {
        owner: {
            type: ObjectId,
            ref: User,
            required: true,
        },
        friend_ship: {
            type: ObjectId,
            ref: User,
            required: true,
        },
        active: { type: Boolean, default: false },
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

module.exports = mongoose.model('FriendShip', FriendShip);
