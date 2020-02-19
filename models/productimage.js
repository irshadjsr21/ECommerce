'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    'ProductImage',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => {
          return uuid();
        }
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      isMain: {
        type: DataTypes.BOOLEAN,
        default: false
      }
    },
    {}
  );
  ProductImage.associate = function(models) {
    ProductImage.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'images'
    });
  };
  return ProductImage;
};
