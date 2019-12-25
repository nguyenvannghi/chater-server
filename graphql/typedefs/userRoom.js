const { gql } = require('apollo-server-express');
// Construct a schema, using GraphQL schema language
const UserRoomTypeDefs = gql`
    enum RoleUserRoomTypes {
        MEMBER
        OWNER
    }
    type UserRoom {
        _id: String!
        user: User
        room: Room
        type: RoleUserRoomTypes
        status: Boolean
        created_by: User
        updated_by: User
    }
    extend type Query {
        userRooms(where: JSON): [UserRoom]
    }
    extend type Mutation {
        addUserRoom(user: IdInput!, room: IdInput!, type: RoleUserRoomTypes, status: Boolean, created_by: IdInput): UserRoom
        updateUserRoom(
            _id: String!
            user: IdInput!
            room: IdInput!
            type: RoleUserRoomTypes
            status: Boolean
            updated_by: IdInput
        ): UserRoom
    }
`;

module.exports.UserRoomTypeDefs = UserRoomTypeDefs;
