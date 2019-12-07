const { authenticated } = require('../../auth/authenticated-guard');
const { GET_MESSAGES, GET_MESSAGE_DETAIL, CREATE_MESSAGE, UPDATE_MESSAGE } = require('../../services/message');

module.exports.MESSAGE_RESOLVERS = {
    Query: {
        messages: authenticated((root, args) => GET_MESSAGES(root, args)),
        message: authenticated((root, args) => GET_MESSAGE_DETAIL(root, args)),
    },
    Mutation: {
        addMessage: authenticated((root, args) => CREATE_MESSAGE(root, args)),
        updateMessage: authenticated((root, args) => UPDATE_MESSAGE(root, args)),
    },
};
