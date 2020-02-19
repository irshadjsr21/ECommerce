'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: { primaryKey: true, type: DataTypes.UUID },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      parentCategoryId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      level: { type: DataTypes.TINYINT, allowNull: false },
      canHaveDivisions: { type: DataTypes.BOOLEAN, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Category.associate = function(models) {
    Category.hasMany(Category, {
      foreignKey: 'parentCategoryId',
      as: 'subCategories'
    });
    Category.belongsTo(Category, {
      foreignKey: 'parentCategoryId',
      as: 'parentCategory'
    });
  };

  Category.beforeCreate(category => {
    category.id = uuid();
  });

  return Category;
};
