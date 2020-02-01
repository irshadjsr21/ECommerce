/**
 * This will export a helper function (route) which will abstract
 * some functionalities of the controller.
 */

const { validationResult } = require('express-validator');
const createError = require('http-errors');
const { errors: errorStrings } = require('../strings');

/**
 * Convert errors array to object.
 * @param {Array} errors
 */
const covertErrorToObject = errors => {
  const fieldErrors = {};
  console.log(errors);
  for (const error of errors) {
    if (error.param && !fieldErrors[error.param])
      fieldErrors[error.param] = error.msg;
  }
  return fieldErrors;
};

/**
 * Extract inputs from the request object.
 *
 * It will return all the fields if `fields` parameter is not specified
 * or is empty.
 *
 * And if `fields` parameter is specified it will return the fields mentioned
 * in it.
 *
 * @param {Object} req The request object from express
 * @param {Array} fields The fields which needs to be extracted
 */
const getInputs = (req, fields) => {
  const inputsObj = {};
  if (fields && fields.length > 0)
    for (const key of fields) inputsObj[key] = req.body[key];
  else for (const key of Object.keys(req.body)) inputsObj[key] = req.body[key];
  return inputsObj;
};

/**
 * It returns the validation errors.
 *
 * @param {Object} req The request object from express
 * @param {Boolean} asObject If it's value is true an Object type error
 * is returned otherwise an array type error is returned
 */
const getValidationError = (req, asObject) => {
  const errors = validationResult(req).array();
  if (asObject) {
    return covertErrorToObject(errors);
  }
  return errors;
};

/**
 * Create a middleware for validation check with the options specified
 * @param {Object} options Options to be specified
 * @param {String} options.errorMsg The error message that should be returned.
 * @param {Boolean} options.throwError Specifies if the middleware should throw
 * error or not. If set to false it will store the errors in req.validationError.
 * @param {Boolean} options.asObject If the error returned should be an object
 */
const createValidationMiddleware = ({
  errorMsg,
  throwError,
  asObject,
  renderPage,
  renderData
}) => {
  return async function(req, res, next) {
    const errors = getValidationError(req, asObject);
    if (
      (!asObject && errors.length > 0) ||
      (asObject && Object.keys(errors).length > 0)
    ) {
      if (throwError) {
        next(createError(400, { errors, code: 400, isCustom: true }, errorMsg));
        return;
      } else res.locals.errors = errors;

      if (renderPage) {
        let dataObj = {};
        if (renderData) {
          if (typeof renderData == 'function') dataObj = await renderData();
          else if (typeof renderData == 'object') dataObj = renderData;
        }
        res.render(renderPage, dataObj);
        return;
      }
    }

    next();
  };
};

/**
 * Returns a middleware which stores SEO variables in `res.locals.seo` object
 * @param {Object|Function} seo The object or function specifing the SEO variables
 */
const createSeoMiddleware = seo => {
  return async (req, res, next) => {
    try {
      res.locals.seo = {};
      let seoObj = {};
      if (typeof seo == 'function') seoObj = await seo(req, res);
      else if (typeof seo == 'object') seoObj = seo;
      else if (typeof seo == 'string') res.locals.seo.title = seo;

      for (const key in seoObj) {
        res.locals.seo[key] = seoObj[key];
      }
      next();
    } catch (error) {
      console.log(error);
      next();
    }
  };
};

/**
 * This will create a series of middleware functions to execute common tasks
 * based on the options provided.
 *
 * @param {*} cb A middleware which is to be executed
 * @param {Object} options Options
 * @param {Object} options.validation Validation Object
 * @param {Array} options.validation.validators Validators array
 * @param {String} options.validation.errorMsg Error message if validation failed
 * @param {Boolean} options.validation.throwError If true throws error if validation fails
 * @param {String} options.validation.renderPage Render page on error
 * @param {Object|Function} options.validation.renderData Function or object which will return render data for the page
 * @param {Boolean} options.validation.asObject Create error as object
 * @param {Boolean|Array} options.inputs If true returns inputs in `res.locals.inputBody`. One can also provide an array with required fields
 * @param {Boolean|Array} options.oldInputs If true returns inputs in `res.locals.oldInputs`. One can also provide an array with required fields
 * @param {Object|Function} options.seo The SEO variable are stored in `res.locals`
 * @param {Object|Function} options.validationBeforeSeo The SEO variable are stored before validation
 */
const route = (
  controller,
  options = {
    validation: {
      validators: [],
      errorMsg: errorStrings.validationError,
      throwError: false,
      asObject: false
    },
    seo: null,
    validationBeforeSeo: false,
    inputs: false,
    renderPage: null,
    renderData: null
  }
) => {
  const middlewareArray = [];

  const customController = async function(req, res, next) {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  if (options.inputs) {
    let fields = [];
    if (Array.isArray(options.inputs)) fields = options.inputs;

    middlewareArray.push((req, res, next) => {
      res.locals.inputBody = getInputs(req, fields);
      next();
    });
  }

  if (options.oldInputs) {
    let fields = [];
    if (Array.isArray(options.oldInputs)) fields = options.oldInputs;
    middlewareArray.push((req, res, next) => {
      res.locals.oldInputs = getInputs(req, fields);
      next();
    });
  }

  if (options.seo && !options.validationBeforeSeo) {
    middlewareArray.push(createSeoMiddleware(options.seo));
  }

  if (options.validation) {
    middlewareArray.push(options.validation.validators);
    middlewareArray.push(
      createValidationMiddleware({
        throwError: options.validation.throwError,
        errorMsg: options.validation.errorMsg || errorStrings.validationError,
        asObject: options.validation.asObject,
        renderData: options.validation.renderData,
        renderPage: options.validation.renderPage
      })
    );
  }

  if (options.seo && options.validationBeforeSeo) {
    middlewareArray.push(createSeoMiddleware(options.seo));
  }

  middlewareArray.push(customController);
  return middlewareArray;
};

module.exports = route;
