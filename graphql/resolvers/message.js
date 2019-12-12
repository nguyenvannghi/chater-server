const { PubSub } = require('apollo-server-express');
const pubsub = new PubSub();

const { authenticated } = require('../../auth/authenticated-guard');
const { GET_MESSAGES, GET_MESSAGE_DETAIL, CREATE_MESSAGE, UPDATE_MESSAGE } = require('../../services/message');
const { MESSAGE_ADDED, MESSAGE_UPDATED } = require('../const');

module.exports.MESSAGE_RESOLVERS = {
    Query: {
        messages: authenticated((root, args) => GET_MESSAGES(root, args)),
        message: authenticated((root, args) => GET_MESSAGE_DETAIL(root, args)),
    },
    Mutation: {
        addMessage: authenticated(async (root, args) => {
            const message = await CREATE_MESSAGE(root, args);
            await pubsub.publish(MESSAGE_ADDED, { [MESSAGE_ADDED]: message });
            return message;
        }),
        updateMessage: authenticated(async (root, args) => {
            const message = await UPDATE_MESSAGE(root, args);
            await pubsub.publish(MESSAGE_UPDATED, {
                [MESSAGE_UPDATED]: message,
            });
            return message;
        }),
    },
    Subscription: {
        [MESSAGE_ADDED]: {
            subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
        },
        [MESSAGE_UPDATED]: {
            subscribe: () => pubsub.asyncIterator([MESSAGE_UPDATED]),
        },
    },
};
