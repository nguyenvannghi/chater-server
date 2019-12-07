const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const { PORT } = require('./configs');
const { contextGuard } = require('./auth/context-guard');
const { schema } = require('./graphql');

const app = express();
const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: contextGuard,
});
server.applyMiddleware({ app, path: '/' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
    console.log(`🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀  Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
