const route = require('../route');

module.exports = {
  status: route(async (req, res) => {
    res.json('Status: Running');
  })
};
