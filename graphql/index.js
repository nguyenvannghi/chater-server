const { makeExecutableSchema } = require('apollo-server-express');
const { merge } = require('lodash');
const { RootTypeDef } = require('./root');
const { UserTypeDefs, RoomTypeDefs, MessageTypeDefs, UserRoomTypeDefs } = require('./typedefs');
const { USER_RESOLVERS, ROOM_RESOLVERS, MESSAGE_RESOLVERS, USER_ROOM_RESOLVERS } = require('./resolvers');

const resolvers = merge(USER_RESOLVERS, ROOM_RESOLVERS, MESSAGE_RESOLVERS, USER_ROOM_RESOLVERS);
const schema = makeExecutableSchema({
    typeDefs: [RootTypeDef, UserTypeDefs, RoomTypeDefs, MessageTypeDefs, UserRoomTypeDefs],
    resolvers,
});
module.exports.schema = schema;
