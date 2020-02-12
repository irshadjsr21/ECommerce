'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => {
          return uuid();
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      discountPrice: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      rawDescription: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      shortDescription: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Product.associate = function(models) {
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'products'
    });
  };
  return Product;
};
