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
const createValidationMiddleware = ({ errorMsg, throwError, asObject }) => {
  return async function(req, res, next) {
    const errors = getValidationError(req, asObject);
    if (
      (!asObject && errors.length > 0) ||
      (asObject && Object.keys(errors).length > 0)
    ) {
      if (throwError) {
        next(createError(400, { errors, code: 400, isCustom: true }, errorMsg));
        return;
      } else req.validationError = errors;
    }

    next();
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
 * @param {Boolean} options.validation.asObject Create error as object
 * @param {Boolean|Array} options.inputs If true returns inputs in `req.inputBody`. One can also provide an array with required fields
 * @param {Boolean|Array} options.oldInputs If true returns inputs in `req.oldInputs`. One can also provide an array with required fields
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
    inputs: false
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
      req.inputBody = getInputs(req, fields);
      next();
    });
  }

  if (options.oldInputs) {
    let fields = [];
    if (Array.isArray(options.oldInputs)) fields = options.oldInputs;
    middlewareArray.push((req, res, next) => {
      req.oldInputs = getInputs(req, fields);
      next();
    });
  }

  if (options.validation) {
    middlewareArray.push(options.validation.validators);
    middlewareArray.push(
      createValidationMiddleware({
        throwError: options.validation.throwError,
        errorMsg: options.validation.errorMsg || errorStrings.validationError,
        asObject: options.validation.asObject
      })
    );
  }

  middlewareArray.push(customController);
  return middlewareArray;
};

module.exports = route;
