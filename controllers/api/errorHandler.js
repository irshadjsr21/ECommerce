const createError = require('http-errors');
const route = require('../route');

module.exports = {
  notFound: route(async (req, res) => {
    res.status(404).json('Page not found');
  }),

  error: async (error, req, res, next) => {
    if (error instanceof createError.HttpError) {
      const obj = {
        message: error.message
      };
      if (error.errors) {
        obj.errors = error.errors;
      }
      res.status(error.status).json(obj);
    } else {
      console.log(error);
      res.status(500).json({ message: 'Server error.' });
    }
  }
};
