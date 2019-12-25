const { USER_RESOLVERS } = require('./user');
const { ROOM_RESOLVERS } = require('./room');
const { MESSAGE_RESOLVERS } = require('./message');
const { USER_ROOM_RESOLVERS } = require('./userRoom');

module.exports = {
    USER_RESOLVERS,
    ROOM_RESOLVERS,
    MESSAGE_RESOLVERS,
    USER_ROOM_RESOLVERS,
};
