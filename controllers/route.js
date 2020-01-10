module.exports = controller => {
  return async function(req, res, next) {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};
