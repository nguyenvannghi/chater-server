const bcrypt = require('bcryptjs');

const saltRounds = 5;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
    hashPassword: password => bcrypt.hashSync(password, salt),
    comparePassword: (password, passwordHash) => bcrypt.compareSync(password, passwordHash),
};
