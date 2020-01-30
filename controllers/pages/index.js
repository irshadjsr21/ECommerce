const route = require('../route');
const { user } = require('../../strings/seo');

module.exports = {
  home: route(
    async (req, res, next) => {
      res.render('index');
    },
    {
      seo: user.home
    }
  )
};
