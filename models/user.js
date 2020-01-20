'use strict';
const uuid = require('uuid/v4');
const bcryptjs = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, defaultValue: 'user' }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };

  User.TYPES = {
    default: 'user',
    admin: 'admin'
  };

  const encryptPassword = async user => {
    if (user.changed('password')) {
      const salt = await bcryptjs.genSalt(12);
      const hashPassword = await bcryptjs.hash(user.password, salt);
      user.password = hashPassword;
    }
    return user;
  };

  User.beforeCreate(async user => {
    user.id = uuid();
    return await encryptPassword(user);
  });

  User.beforeUpdate(encryptPassword);

  User.prototype.checkPassword = async function(password) {
    return await bcryptjs.compare(password, this.password);
  };

  return User;
};
