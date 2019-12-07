const { PubSub } = require('apollo-server-express');
const { authenticated } = require('../../auth/authenticated-guard');
const { GET_USERS, GET_USER_DETAIL, CREATE_USER, UPDATE_USER, LOGIN, REFRESH_TOKEN } = require('../../services/user');

const pubsub = new PubSub();

const USER_ADDED = 'USER_ADDED';
const USER_UPDATED = 'USER_UPDATED';

module.exports.USER_RESOLVERS = {
    Query: {
        users: authenticated((root, args, context) => GET_USERS(root, args)),
        user: authenticated((root, args) => GET_USER_DETAIL(root, args)),
    },
    Mutation: {
        addUser: authenticated((root, args) => {
            pubsub.publish(USER_ADDED, {
                postAdded: args,
            });
            return CREATE_USER(root, args);
        }),
        updateUser: authenticated((root, args) => {
            pubsub.publish(USER_UPDATED, {
                postAdded: args,
            });
            return UPDATE_USER(root, args);
        }),
        login: (root, args) => LOGIN(root, args),
        refreshToken: (root, args) => REFRESH_TOKEN(root, args),
    },
    Subscription: {
        userAdded: {
            subscribe: () => pubsub.asyncIterator([USER_ADDED]),
        },
        userUpdated: {
            subscribe: () => pubsub.asyncIterator([USER_UPDATED]),
        },
    },
};
