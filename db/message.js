const mongoose = require('../configs/db');
const Room = require('./room');
const User = require('./user');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Message = new Schema(
    {
        room: { type: ObjectId, ref: Room, required: true },
        sender: {
            type: ObjectId,
            ref: User,
            required: true,
        },
        message_body: String,
        message_status: { type: Boolean, default: true },
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

module.exports = mongoose.model('Message', Message);
