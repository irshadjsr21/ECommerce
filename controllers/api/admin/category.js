const createError = require('http-errors');
const route = require('../../route');
const validators = require('../../../validators/admin/category');
const { Category } = require('../../../models');

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

  getParentOptions: route(async (req, res) => {
    const categories = await Category.findAll({
      attributes: ['id', 'name'],
      where: { canHaveDivisions: true }
    });
    res.json({ categories });
  }),

  list: route(async (req, res) => {
    let { page, itemsPerPage } = req.query;
    const { level, parent, sortBy, order, divisions } = req.query;

    page = page ? parseInt(page) : 1;
    itemsPerPage = itemsPerPage ? parseInt(itemsPerPage) : 10;

    const query = {};
    let orderArr = [['createdAt', 'ASC']];
    if (level) query.level = level;
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
  })
};