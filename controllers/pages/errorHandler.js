const route = require('../route');

module.exports = {
  notFound: route(async (req, res) => {
    res.status(404).render('error', { error: 'Page not found', status: 404 });
  }),

  error: async (error, req, res, next) => {
    console.log(error);
    res.status(500).render('error', { error: 'Server Error', status: 500 });
  }
};
