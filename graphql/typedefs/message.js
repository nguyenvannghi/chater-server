const { gql } = require('apollo-server-express');
// Construct a schema, using GraphQL schema language
const MessageTypeDefs = gql`
    type Message {
        _id: String!
        room: Room
        sender: User
        message_body: String
        message_status: Boolean
        created_by: User
        createdAt: Date
        updatedAt: Date
    }
    extend type Query {
        messages(where: JSON): [Message]
        message(_id: String!): Message
    }
    extend type Mutation {
        addMessage(user_id: IdInput!, room_id: IdInput!, message_body: String, message_status: Boolean, created_by: IdInput): Message
        updateMessage(_id: String!, message_body: String, message_status: Boolean, updated_by: IdInput): Message
    }
    extend type Subscription {
        messageAdded: Message
        messageUpdated: Message
    }
`;

module.exports.MessageTypeDefs = MessageTypeDefs;
