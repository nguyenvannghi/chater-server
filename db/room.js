const mongoose = require('../configs/db');
const User = require('./user');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Room = new Schema(
    {
        users: [
            {
                type: ObjectId,
                ref: User,
            },
        ],
        owners: [
            {
                type: ObjectId,
                ref: User,
            },
        ],
        name: {
            type: String,
            maxlength: 225,
            required: [true, 'name is required'],
        },
        description: { type: String, maxlength: 225 },
        topic: { type: String, maxlength: 225 },
        image_url: {
            type: String,
        },
        created_by: {
            type: ObjectId,
            ref: User,
        },
        updated_by: {
            type: ObjectId,
            ref: User,
        },
        is_private: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('Room', Room);
