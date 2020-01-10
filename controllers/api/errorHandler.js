const route = require('../route');

module.exports = {
  notFound: route(async (req, res) => {
    res.status(404).json('Page not found');
  }),

  error: async (error, req, res, next) => {
    res.status(500).json('Server Error');
  }
};
