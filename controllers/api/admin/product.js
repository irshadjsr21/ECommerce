const createError = require('http-errors');
const marked = require('marked');
const insane = require('insane');
const route = require('../../route');
const validators = require('../../../validators/admin/product');
const { product: uploadImage } = require('../../../middlewares/uploadImage');
const {
  Product,
  ProductImage,
  Category,
  sequelize
} = require('../../../models');

module.exports = {
  add: route(
    async (req, res) => {
      const { inputBody } = res.locals;
      const body = { ...inputBody };
      if (inputBody.categoryId) {
        const category = await Category.findByPk(inputBody.categoryId);
        if (!category) {
          throw new createError(404, 'Validation error.', {
            errors: { categoryId: 'This category does not exist.' }
          });
        }
      }

      if (inputBody.description) {
        const html = marked(inputBody.description);
        body.description = insane(html);
        body.rawDescription = inputBody.description;
      }

      if (!inputBody.discountPrice) {
        delete body.discountPrice;
      }

      const mainImage = inputBody.mainImage;
      let product;
      delete inputBody.mainImage;

      await sequelize.transaction(async transaction => {
        product = await Product.create(body, { transaction });
        await ProductImage.create(
          {
            path: mainImage,
            isMain: true,
            productId: product.id
          },
          { transaction }
        );
      });

      res.json({ product });
    },
    {
      validation: {
        asObject: true,
        throwError: true,
        validators: [validators.new]
      },
      inputs: [
        'name',
        'price',
        'discountPrice',
        'categoryId',
        'shortDescription',
        'description'
      ],
      fileUpload: {
        func: uploadImage,
        name: 'mainImage',
        isRequired: true
      }
    }
  )
};
