const { gql } = require('apollo-server-express');
// Construct a schema, using GraphQL schema language
const RoomTypeDefs = gql`
    type Room {
        _id: String!
        users: [User]
        owners: [User]
        name: String!
        description: String
        topic: String
        image_url: String
        created_by: User
        updated_by: User
        is_private: Boolean
    }
    extend type Query {
        rooms(where: JSON): [Room]
        room(_id: String!): Room
    }
    extend type Mutation {
        addRoom(
            users: [IdInput]
            owners: [IdInput]
            name: String!
            description: String
            topic: String
            image_url: String
            created_by: IdInput
            is_private: Boolean
        ): Room
        updateRoom(
            _id: String!
            users: [IdInput]
            owners: [IdInput]
            name: String
            description: String
            topic: String
            image_url: String
            updated_by: IdInput
            is_private: Boolean
        ): Room
    }
`;

module.exports.RoomTypeDefs = RoomTypeDefs;
