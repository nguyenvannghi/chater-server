const { authenticated } = require('../../auth/authenticated-guard');
const { GET_USER_ROOMS, CREATE_USER_ROOM, UPDATE_USER_ROOM } = require('../../services/user-room');

module.exports.USER_ROOM_RESOLVERS = {
    Query: {
        userRooms: authenticated((root, args) => GET_USER_ROOMS(root, args)),
    },
    Mutation: {
        addUserRoom: authenticated((root, args) => CREATE_USER_ROOM(root, args)),
        updateUserRoom: authenticated((root, args) => UPDATE_USER_ROOM(root, args)),
    },
};
