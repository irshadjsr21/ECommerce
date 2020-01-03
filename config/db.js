/**
 * Configuration file for Sequelize
 */

module.exports = {
  development: {
    username: 'irshad',
    password: 'Sql@password123',
    database: 'e_commerce',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'irshad',
    password: 'Sql@password123',
    database: 'e_commerce_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
};
