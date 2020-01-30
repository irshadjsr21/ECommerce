const route = require('../../route');

module.exports = {
  home: route(async (req, res, next) => {
    res.render('admin/index', { title: 'Title', name: 'dashboard' });
  })
};
