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
      const { validationError, oldInputs } = req;

      if (validationError && Object.keys(validationError).length > 0) {
        res.status(400).render('auth/login', {
          errors: validationError,
          oldInputs,
          title: 'Login'
        });
        return;
      }

      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        res.status(404).render('auth/login', {
          errors: { email: errorStrings.userNotFound },
          oldInputs,
          title: 'Login'
        });
        return;
      }

      const validPassword = await user.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(401).render('auth/login', {
          errors: { password: errorStrings.incorrectPassword },
          oldInputs,
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
        asObject: true
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
      const { validationError, inputBody, oldInputs } = req;

      if (validationError && Object.keys(validationError).length > 0) {
        res.status(400).render('auth/signup', {
          errors: validationError,
          oldInputs,
          title: 'Signup'
        });
        return;
      }

      const doExist = await User.findOne({ where: { email: req.body.email } });
      if (doExist) {
        res.status(409).render('auth/signup', {
          errors: { email: errorStrings.userAlreadyExist },
          oldInputs,
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
        asObject: true
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
