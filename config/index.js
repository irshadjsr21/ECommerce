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
  },
  ADMIN: {
    FIRST_NAME: 'Irshad',
    LAST_NAME: 'Ansari',
    EMAIL: 'irshadjsr21@gmail.com',
    SECRET: 'secret',
    PASSWORD: '12345678',
    PATH: '/admin'
  }
};

if (process.env.NODE_ENV == 'production') {
  config.SESSION.SECRET = getEnvVariable('SESSION_SECRET');

  config.ADMIN.FIRST_NAME = getEnvVariable('ADMIN_FIRST_NAME');
  config.ADMIN.LAST_NAME = getEnvVariable('ADMIN_LAST_NAME');
  config.ADMIN.EMAIL = getEnvVariable('ADMIN_EMAIL');
  config.ADMIN.SECRET = getEnvVariable('ADMIN_SECRET');
  config.ADMIN.PASSWORD = getEnvVariable('ADMIN_PASSWORD');
  config.ADMIN.PASSWORD = getEnvVariable('ADMIN_PATH');
}

module.exports = config;
