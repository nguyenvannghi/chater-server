const { makeExecutableSchema } = require('apollo-server-express');
const { merge } = require('lodash');
const { RootTypeDef } = require('./root');
const { UserTypeDefs, RoomTypeDefs, MessageTypeDefs } = require('./typedefs');
const { USER_RESOLVERS, ROOM_RESOLVERS, MESSAGE_RESOLVERS } = require('./resolvers');

const resolvers = merge(USER_RESOLVERS, ROOM_RESOLVERS, MESSAGE_RESOLVERS);
const schema = makeExecutableSchema({
    typeDefs: [RootTypeDef, UserTypeDefs, RoomTypeDefs, MessageTypeDefs],
    resolvers,
});
module.exports.schema = schema;
