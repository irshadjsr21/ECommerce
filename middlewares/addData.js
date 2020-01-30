/**
 * This will store the data provided in `res.locals`
 * @param {Object} object Object containing data
 */
const addData = object => {
  return (req, res, next) => {
    if (typeof object == 'object') {
      for (const key in object) {
        res.locals[key] = object[key];
      }
    }

    next();
  };
};

module.exports = addData;
