const dotenv = require('dotenv').config();
module.exports = {
    google: {
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
    },
        mongodb: {
            DATABASE_URI: process.env.DATABASE_URI,
        },

    session: {
        cookieKey: process.env.COOKIEKEY,
      },
};