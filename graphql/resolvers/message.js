const { PubSub } = require('apollo-server-express');
const { authenticated } = require('../../auth/authenticated-guard');
const { GET_MESSAGES, GET_MESSAGE_DETAIL, CREATE_MESSAGE, UPDATE_MESSAGE } = require('../../services/message');

const pubsub = new PubSub();

const MESSAGE_ADDED = 'MESSAGE_ADDED';
const MESSAGE_UPDATED = 'MESSAGE_UPDATED';

module.exports.MESSAGE_RESOLVERS = {
    Query: {
        messages: authenticated((root, args) => GET_MESSAGES(root, args)),
        message: authenticated((root, args) => GET_MESSAGE_DETAIL(root, args)),
    },
    Mutation: {
        addMessage: authenticated((root, args) => {
            pubsub.publish(MESSAGE_ADDED, {
                messageAdded: args,
            });
            return CREATE_MESSAGE(root, args);
        }),
        updateMessage: authenticated((root, args) => {
            pubsub.publish(MESSAGE_UPDATED, {
                messageUpdated: args,
            });
            return UPDATE_MESSAGE(root, args);
        }),
    },
    Subscription: {
        messageAdded: authenticated({
            subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
        }),
        messageUpdated: {
            subscribe: () => pubsub.asyncIterator([MESSAGE_UPDATED]),
        },
    },
};
