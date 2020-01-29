const route = require('../../route');
const { User } = require('../../../models');
const validators = require('../../../validators/admin/auth');
const { errors: errorStrings } = require('../../../strings');
const { ADMIN } = require('../../../config');

module.exports = {
  loginPage: route(async (req, res) => {
    res.render('auth/login', { title: 'Login', forAdmin: true });
  }),

  loginAction: route(
    async (req, res) => {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        res.status(401).render('auth/login', {
          errors: { default: errorStrings.incorrectAdminCredentials },
          forAdmin: true,
          title: 'Login'
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
          forAdmin: true,
          title: 'Login'
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
        renderData: { title: 'Login', forAdmin: true }
      },
      inputs: ['email', 'password', 'secret'],
      oldInputs: ['email']
    }
  )
};
