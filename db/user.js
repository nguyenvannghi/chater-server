const mongoose = require('mongoose');
const { hashPassword, comparePassword } = require('../helper');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, 'username is required'],
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, 'email is required'],
        },
        password: { type: String, require: [true, 'password is required'] },
        is_active: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

User.pre('save', next => {
    if (this.password) {
        this.password = hashPassword(this.password);
    }
    next();
});

User.methods.comparePassword = function(password) {
    return comparePassword(password, this.password);
};

module.exports = mongoose.model('User', User);
