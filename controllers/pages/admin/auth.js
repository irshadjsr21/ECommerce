const route = require('../../route');
const { User } = require('../../../models');
const validators = require('../../../validators/admin/auth');
const { errors: errorStrings, seo: seoObject } = require('../../../strings');
const { ADMIN } = require('../../../config');

module.exports = {
  loginPage: route(
    async (req, res) => {
      res.render('auth/login', { forAdmin: true });
    },
    {
      seo: seoObject.admin.login
    }
  ),

  loginAction: route(
    async (req, res) => {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        res.status(401).render('auth/login', {
          errors: { default: errorStrings.incorrectAdminCredentials },
          forAdmin: true
        });
        return;
      }

      const validPassword = await user.checkPassword(req.body.password);

      if (
        !validPassword ||
        user.type != User.TYPES.admin ||
        res.locals.inputBody.secret != ADMIN.SECRET
      ) {
        res.status(401).render('auth/login', {
          errors: { default: errorStrings.incorrectAdminCredentials },
          forAdmin: true
        });
        return;
      }

      req.session.userId = user.id;
      req.session.save(() => {
        res.redirect(ADMIN.PATH);
      });
    },
    {
      validation: {
        validators: [validators.login],
        throwError: false,
        asObject: true,
        renderPage: 'auth/login',
        renderData: { forAdmin: true }
      },
      seo: seoObject.admin.login,
      inputs: ['email', 'password', 'secret'],
      oldInputs: ['email']
    }
  )
};
