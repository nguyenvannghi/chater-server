const { gql } = require('apollo-server-express');
// Construct a schema, using GraphQL schema language
const UserTypeDefs = gql`
    type User {
        _id: String!
        username: String!
        email: String!
        is_active: Boolean
    }
    input UserInput {
        _id: String!
    }
    type AuthPayLoad {
        token: String
        user: User
    }
    extend type Query {
        users: [User]
        user(_id: String!): User
    }
    extend type Mutation {
        addUser(username: String!, email: String!, password: String!, is_active: Boolean): User
        updateUser(_id: String!, password: String!, is_active: Boolean): User
        login(username: String!, password: String!): AuthPayLoad!
        refreshToken(token: String!): String!
    }
    extend type Subscription {
        userAdded: User
        userUpdated: User
    }
`;

module.exports.UserTypeDefs = UserTypeDefs;
