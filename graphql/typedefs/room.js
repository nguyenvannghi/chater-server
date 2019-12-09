const { gql } = require('apollo-server-express');
// Construct a schema, using GraphQL schema language
const RoomTypeDefs = gql`
    type Room {
        _id: String!
        users: [User]
        name: String!
        description: String
        topic: String
        image_url: String
        created_by: User
        updated_by: User
        is_private: Boolean
    }
    input RoomInput {
        _id: String!
    }
    extend type Query {
        rooms(where: Where): [Room]
        room(_id: String!): Room
    }
    extend type Mutation {
        addRoom(
            users: [UserInput]
            name: String!
            description: String
            topic: String
            image_url: String
            created_by: UserInput
            is_private: Boolean
        ): Room
        updateRoom(
            _id: String!
            users: [UserInput]
            name: String!
            description: String
            topic: String
            image_url: String
            updated_by: UserInput
            is_private: Boolean
        ): Room
    }
    extend input Where {
        users: [String]
    }
`;

module.exports.RoomTypeDefs = RoomTypeDefs;
