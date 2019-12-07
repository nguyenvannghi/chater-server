const mongoose = require('mongoose');
const { MONGO_URI } = require('.');
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', () => {
    console.log('‍🚀  Error occurred from the database');
});
db.once('open', () => {
    console.log('🚀  Connection to MongoDB is live. Database: ' + db.name);
});
module.exports = mongoose;
