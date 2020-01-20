/**
 * This file will contain all the configuration keys.
 * Throws error if in production and a key is not specified.
 */

const getEnvVariable = key => {
  const value = process.env[key];
  if (!value) throw new Error(`ENVIREMENT VARIABLE '${key}' NOT SPECIFIED.`);
};

let config = {
  SESSION: {
    SECRET: 'some secret'
  }
};

if (process.env.NODE_ENV == 'production') {
  config.SESSION.SECRET = getEnvVariable('SESSION_SECRET');
}

module.exports = config;
