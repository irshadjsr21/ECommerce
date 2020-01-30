const route = require('../../route');
const { admin } = require('../../../strings/seo');

module.exports = {
  home: route(
    async (req, res, next) => {
      res.render('admin/user');
    },
    {
      seo: admin.user
    }
  )
};
