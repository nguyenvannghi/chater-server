const { gql } = require('apollo-server-express');
// Construct a schema, using GraphQL schema language
const MessageTypeDefs = gql`
    type Message {
        _id: String!
        room: Room
        sender: User
        message_body: String
        message_status: Boolean
    }
    extend type Query {
        messages(where: Where): [Message]
        message(_id: String!): Message
    }
    extend type Mutation {
        addMessage(user_id: UserInput!, room_id: RoomInput!, message_body: String, message_status: Boolean, created_by: UserInput): Message
        updateMessage(_id: String!, message_body: String, message_status: Boolean, updated_by: UserInput): Message
    }
    input Where {
        room: String
    }
`;

module.exports.MessageTypeDefs = MessageTypeDefs;
