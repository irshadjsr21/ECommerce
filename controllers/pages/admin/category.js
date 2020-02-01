const route = require('../../route');
const { admin } = require('../../../strings/seo');
const validators = require('../../../validators/admin/category');
const { Category } = require('../../../models');

const addCategoryData = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const obj = {};
      obj.categories = await Category.findAll({
        where: { canHaveDivisions: true },
        attributes: ['id', 'name']
      });
      resolve(obj);
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  home: route(
    async (req, res, next) => {
      res.render('admin/category');
    },
    {
      seo: admin.category
    }
  ),

  addCategory: route(
    async (req, res, next) => {
      res.render('admin/category/add', await addCategoryData());
    },
    {
      seo: admin.addCategory
    }
  ),

  addCategoryAction: route(
    async (req, res, next) => {
      const { inputBody } = res.locals;
      let level = 1;

      if (inputBody.slug) {
        const cWithSameSlug = await Category.findOne({
          where: { slug: inputBody.slug }
        });
        if (cWithSameSlug) {
          res.render('admin/category/add', {
            ...(await addCategoryData()),
            errors: {
              slug: 'Category with this slug already exists.'
            }
          });
          return;
        }
      }

      if (!inputBody.parentCategoryId) delete inputBody.parentCategoryId;
      else {
        const parentCategory = await Category.findOne({
          where: { id: inputBody.parentCategoryId, canHaveDivisions: true }
        });
        if (!parentCategory) {
          res.render('admin/category/add', {
            ...(await addCategoryData()),
            errors: {
              parentCategoryId: 'Selected parent category does not exist.'
            }
          });
          return;
        } else {
          level = parentCategory.level + 1;
        }
      }
      inputBody.canHaveDivisions =
        inputBody.canHaveDivisions == 'yes' ? true : false;

      inputBody.slug = inputBody.slug.toLowerCase();
      const category = await Category.create({ ...inputBody, level });
      res.render('admin/category/add', {
        ...(await addCategoryData()),
        success: `Category '${category.name}' has been craeted.`
      });
    },
    {
      validation: {
        asObject: true,
        throwError: false,
        validators: [validators.new],
        renderPage: 'admin/category/add',
        renderData: addCategoryData
      },
      seo: admin.addCategory,
      inputs: ['name', 'parentCategoryId', 'canHaveDivisions', 'slug'],
      oldInputs: ['name', 'parentCategoryId', 'canHaveDivisions', 'slug']
    }
  )
};
