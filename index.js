const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { PORT } = require('./configs');
const { contextGuard } = require('./auth/context-guard');
const getErrorCode = require('./helper/format-error');
const { schema } = require('./graphql');

let uploadAssetConfig = require('./services/asset-upload');

const app = express();
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // <-- REQUIRED backend setting
};

uploadAssetConfig.init(app);

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: contextGuard,
    formatError: err => {
        console.log(err);
        const error = getErrorCode(err.message);
        return { message: error.message, statusCode: error.statusCode };
    },
    subscriptions: {
        keepAlive: 1000,
        onConnect: async (connectionParams, webSocket, context) => {
            console.log(`🚀  Subscription client connected using Apollo server's built-in SubscriptionServer.`);
        },
        onDisconnect: async (webSocket, context) => {
            console.log(`🚀  Subscription client disconnected.`);
        },
        path: '/subscriptions',
    },
});
server.applyMiddleware({ app, path: '/', cors: corsOptions });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
    console.log(`🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀  Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
