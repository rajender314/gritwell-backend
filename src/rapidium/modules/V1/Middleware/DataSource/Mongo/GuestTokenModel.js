const bcrypt = require('bcrypt');
require('dotenv').config();

/**
 * Configuration.
 */

const ClientModel = require('./Model/client');
const TokenModel = require('./Model/guesttoken');
const UserModel = require('./Model/guestuser');

/**
 * Add example client and user to the database (for debug).
 */

const loadExampleData = function() {
  const client1 = new ClientModel({
    id: 'application',
    clientId: 'application',
    clientSecret: 'secret',
    grants: ['password', 'refresh_token'],
    redirectUris: [],
  });

  const client2 = new ClientModel({
    clientId: 'confidentialApplication',
    clientSecret: 'topSecret',
    grants: ['password', 'client_credentials'],
    redirectUris: [],
  });

  const user = new UserModel({
    username: 'pedroetb',
    password: 'password',
  });

  client1.save(function(err, client) {
    if (err) {
      return console.error(err);
    }
    console.log('Created client', client);
  });

  user.save(function(err, user) {
    if (err) {
      return console.error(err);
    }
    console.log('Created user', user);
  });

  client2.save(function(err, client) {
    if (err) {
      return console.error(err);
    }
    console.log('Created client', client);
  });
};

/*
 * Methods used by all grant types.
 */

const getAccessToken = function(token, callback) {
  TokenModel
      .findOne({
        accessToken: token,
      })
      .lean()
      .exec(
          function(callback, err, token) {
            if (!token) {
              console.error('Token not found');
            } else {

            }

            callback(err, token);
          }.bind(null, callback),
      );
};

const getClient = function(clientId, clientSecret, callback) {
  ClientModel
      .findOne({
        clientId: clientId,
        clientSecret: clientSecret,
      })
      .lean()
      .exec(
          function(callback, err, client) {
            if (!client) {
              console.error('Client not found');
            }

            callback(err, client);
          }.bind(null, callback),
      );
};

const saveToken = function(token, client, user, callback) {
  token.client = {
    id: client.clientId,
  };

  token.user = {
    username: user.username,
    id: user._id,
  };

  const tokenInstance = new TokenModel(token);
  tokenInstance.save(
      function(callback, err, token) {
        if (!token) {
          console.error('Token not saved');
        } else {
          token = token.toObject();
          delete token._id;
          delete token.__v;
        }

        callback(err, token);
      }.bind(null, callback),
  );
};

/*
 * Method used only by password grant type.
 */
const getUser = function(username, password, callback) {
  UserModel
      .findOne({email: username})
      .lean()
      .exec(
          function(callback, err, user) {
            if (user) {
              bcrypt.compare(password, user['password'], (err, res) => {
                // res == true or res == false
                if (res) {
                  callback(err, user);
                } else {
                  callback(err, null);
                }
              });
            } else {
              callback(err, null);
            }
          }.bind(null, callback),
      );
};


/*
 * Method used only by client_credentials grant type.
 */

const getUserFromClient = function(client, callback) {
  ClientModel
      .findOne({
        clientId: client.clientId,
        clientSecret: client.clientSecret,
        grants: 'client_credentials',
      })
      .lean()
      .exec(
          function(callback, err, client) {
            if (!client) {
              console.error('Client not found');
            }

            callback(err, {
              username: '',
            });
          }.bind(null, callback),
      );
};

/*
 * Methods used only by refresh_token grant type.
 */

const getRefreshToken = function(refreshToken, callback) {
  TokenModel
      .findOne({
        refreshToken: refreshToken,
      })
      .lean()
      .exec(
          function(callback, err, token) {
            if (!token) {
              console.error('Token not found');
            }

            callback(err, token);
          }.bind(null, callback),
      );
};

const revokeToken = function(token, callback) {
  TokenModel
      .deleteOne({
        refreshToken: token.refreshToken,
      })
      .exec(
          function(callback, err, results) {
            const deleteSuccess = results && results.deletedCount === 1;

            if (!deleteSuccess) {
              console.error('Token not deleted');
            }
            callback(err, deleteSuccess);
          }.bind(null, callback),
      );
};
const logOut = function(token) {
  let tokenVal =
    token.headers && token.headers.authorization ?
      token.headers.authorization :
      '478b7aaf28180ecb2865e6192ef37c44300bc40f';
  tokenVal = tokenVal.replace('Bearer ', '');
  return TokenModel
      .deleteOne({
        accessToken: tokenVal,
      })
      .then((updatestatsres) => {
      // console.log(tokenVal);
        return {data: [], success: true, message: 'Logout Successfully'};
      })
      .catch((error) => {
      //  console.log(error);
        return {data: [], success: false, message: 'Logout failed'};
      });
};

/**
 * Export model definition object.
 */

module.exports = {
  getAccessToken: getAccessToken,
  getClient: getClient,
  saveToken: saveToken,
  getUser: getUser,
  getUserFromClient: getUserFromClient,
  getRefreshToken: getRefreshToken,
  revokeToken: revokeToken,
  createClient: loadExampleData,
  logOut: logOut,
};
