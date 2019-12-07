const { authenticated } = require('../../auth/authenticated-guard');
const { GET_ROOMS, GET_ROOM_DETAIL, CREATE_ROOM, UPDATE_ROOM } = require('../../services/room');

module.exports.ROOM_RESOLVERS = {
    Query: {
        rooms: authenticated((root, args) => GET_ROOMS(root, args)),
        room: authenticated((root, args) => GET_ROOM_DETAIL(root, args)),
    },
    Mutation: {
        addRoom: authenticated((root, args) => CREATE_ROOM(root, args)),
        updateRoom: authenticated((root, args) => UPDATE_ROOM(root, args)),
    },
};
