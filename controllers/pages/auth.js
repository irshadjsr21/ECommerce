const route = require('../route');
const { User } = require('../../models');
const validators = require('../../validators/auth');
const { errors: errorStrings } = require('../../strings');

module.exports = {
  loginPage: route(async (req, res) => {
    res.render('auth/login', { title: 'Login' });
  }),

  loginAction: route(
    async (req, res) => {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        res.status(404).render('auth/login', {
          errors: { email: errorStrings.userNotFound },
          title: 'Login'
        });
        return;
      }

      const validPassword = await user.checkPassword(req.body.password);

      if (!validPassword || user.type != User.TYPES.default) {
        res.status(401).render('auth/login', {
          errors: { password: errorStrings.incorrectPassword },
          title: 'Login'
        });
        return;
      }

      req.session.userId = user.id;
      req.session.save(() => {
        res.redirect('/');
      });
    },
    {
      validation: {
        validators: [validators.login],
        throwError: false,
        asObject: true,
        renderPage: 'auth/login',
        renderData: { title: 'Login' }
      },
      inputs: ['email', 'password'],
      oldInputs: ['email']
    }
  ),

  signupPage: route(async (req, res) => {
    res.render('auth/signup', { title: 'Signup' });
  }),

  signupAction: route(
    async (req, res) => {
      const { inputBody } = res.locals;

      const doExist = await User.findOne({ where: { email: req.body.email } });
      if (doExist) {
        res.status(409).render('auth/signup', {
          errors: { email: errorStrings.userAlreadyExist },
          title: 'Signup'
        });
        return;
      }

      const user = await User.create(inputBody);

      req.session.userId = user.id;
      req.session.save(() => {
        res.redirect('/');
      });
    },
    {
      validation: {
        validators: [validators.signup],
        throwError: false,
        asObject: true,
        renderPage: 'auth/signup',
        renderData: { title: 'Signup' }
      },
      inputs: ['firstName', 'lastName', 'email', 'password'],
      oldInputs: ['firstName', 'lastName', 'email']
    }
  ),

  logout: route((req, res) => {
    req.session.userId = null;
    req.session.save(() => {
      res.redirect('/');
    });
  })
};
