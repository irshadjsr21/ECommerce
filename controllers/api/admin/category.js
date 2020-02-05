const createError = require('http-errors');
const route = require('../../route');
const validators = require('../../../validators/admin/category');
const { Category, Sequelize, sequelize } = require('../../../models');

module.exports = {
  add: route(
    async (req, res) => {
      const { inputBody } = res.locals;
      let level = 1;

      if (inputBody.slug) {
        const cWithSameSlug = await Category.findOne({
          where: { slug: inputBody.slug }
        });
        if (cWithSameSlug) {
          throw new createError(409, 'Validation error.', {
            errors: { slug: 'Category with this slug already exists.' }
          });
        }
      }

      if (!inputBody.parentCategoryId) delete inputBody.parentCategoryId;
      else {
        const parentCategory = await Category.findOne({
          where: { id: inputBody.parentCategoryId, canHaveDivisions: true }
        });
        if (!parentCategory) {
          throw new createError(createError.Conflict, 'Validation error.', {
            errors: {
              parentCategoryId: 'Selected parent category does not exist.'
            }
          });
        } else {
          level = parentCategory.level + 1;
        }
      }
      inputBody.canHaveDivisions =
        inputBody.canHaveDivisions == 'yes' ? true : false;

      inputBody.slug = inputBody.slug.toLowerCase();
      const category = await Category.create({ ...inputBody, level });
      res.json({ category });
    },
    {
      validation: {
        asObject: true,
        throwError: true,
        validators: [validators.new]
      },
      inputs: ['name', 'parentCategoryId', 'canHaveDivisions', 'slug']
    }
  ),

  update: route(
    async (req, res) => {
      const { id } = req.params;
      const { inputBody } = res.locals;
      let level = 1;

      if (inputBody.slug) {
        const cWithSameSlug = await Category.findOne({
          where: { slug: inputBody.slug, id: { [Sequelize.Op.not]: id } }
        });
        if (cWithSameSlug) {
          throw new createError(409, 'Validation error.', {
            errors: { slug: 'Category with this slug already exists.' }
          });
        }
      }

      if (!inputBody.parentCategoryId) inputBody.parentCategoryId = null;
      else {
        const parentCategory = await Category.findOne({
          where: { id: inputBody.parentCategoryId, canHaveDivisions: true }
        });
        if (!parentCategory) {
          throw new createError(createError.Conflict, 'Validation error.', {
            errors: {
              parentCategoryId: 'Selected parent category does not exist.'
            }
          });
        } else {
          level = parentCategory.level + 1;
        }
      }
      inputBody.canHaveDivisions =
        inputBody.canHaveDivisions == 'yes' ? true : false;

      if (!inputBody.canHaveDivisions) {
        const subCategory = await Category.findOne({
          where: { parentCategoryId: id }
        });

        if (subCategory) {
          throw new createError(409, 'Conflict.', {
            errors: {
              canHaveDivisions: 'This category already have divisions.'
            }
          });
        }
      }

      await sequelize.transaction(async transaction => {
        await Category.update(
          { level: level + 1 },
          { where: { parentCategoryId: id }, transaction }
        );
        await Category.update(
          { ...inputBody, level },
          { where: { id }, transaction }
        );
      });

      const updatedCategory = await Category.findByPk(id);

      res.json({ category: updatedCategory });
    },
    {
      validation: {
        asObject: true,
        throwError: true,
        validators: [validators.new]
      },
      inputs: ['name', 'parentCategoryId', 'canHaveDivisions', 'slug']
    }
  ),

  getParentOptions: route(async (req, res) => {
    const categories = await Category.findAll({
      attributes: ['id', 'name'],
      where: { canHaveDivisions: true }
    });
    res.json({ categories });
  }),

  getLevels: route(async (req, res) => {
    const levels = await Category.aggregate('level', 'DISTINCT', {
      plain: false
    });
    const distLevels = [];
    for (const level of levels) {
      if (level && level.DISTINCT) {
        distLevels.push(level.DISTINCT);
      }
    }
    res.json({ levels: distLevels.sort() });
  }),

  list: route(async (req, res) => {
    let { page, itemsPerPage } = req.query;
    const { level, parent, sortBy, order, divisions } = req.query;

    page = page ? parseInt(page) : 1;
    itemsPerPage = itemsPerPage ? parseInt(itemsPerPage) : 10;

    const query = {};
    let orderArr = [['createdAt', 'ASC']];
    if (level) query.level = level.split(',');
    if (parent) query.parentCategoryId = parent;
    if (divisions) query.canHaveDivisions = divisions == 'yes' ? true : false;
    if (sortBy) orderArr = [[sortBy, order || 'ASC']];
    const categories = await Category.findAll({
      where: query,
      order: orderArr,
      offset: (page - 1) * itemsPerPage,
      limit: itemsPerPage
    });

    const totalCategories = await Category.count({ where: query });

    res.json({
      page,
      itemsPerPage,
      categories,
      lastPage: Math.ceil(totalCategories / itemsPerPage)
    });
  }),

  getById: route(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: [
        { model: Category, as: 'subCategories' },
        { model: Category, as: 'parentCategory' }
      ]
    });
    res.json(category);
  }),

  delete: route(async (req, res) => {
    const { id } = req.params;
    const subCategory = await Category.findOne({
      where: { parentCategoryId: id }
    });
    if (subCategory) {
      throw new createError(
        409,
        'Cannot delete category because it has sub categories.',
        {
          errors: {
            default: 'Cannot delete category because it has sub categories.'
          }
        }
      );
    }

    await Category.destroy({ where: { id } });
    res.json({});
  })
};
