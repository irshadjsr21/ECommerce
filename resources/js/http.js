import axios from 'axios';
import config from './config';
import csrfToken from './csrfToken';

const instance = axios.create({
  baseURL: config.baseUrl,
  headers: { 'csrf-token': csrfToken() }
});

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    let extractedErrors = {};
    const errorObj = {};
    if (!(error && error.response)) {
      extractedErrors.default = 'Can not reach the server at the moment.';
    } else if (error.response.data) {
      if (
        error.response.data.errors &&
        Object.keys(error.response.data.errors).length > 0
      ) {
        extractedErrors = error.response.data.errors;
      } else if (error.response.data.message) {
        extractedErrors.default = error.response.data.message;
      }
    } else {
      extractedErrors.default = 'Unexpected error occured.';
    }
    let errorMsg = 'Unexpected error occured.';
    if (extractedErrors) {
      if (extractedErrors.default) {
        errorMsg = extractedErrors.default;
      } else {
        const keys = Object.keys(extractedErrors);
        errorMsg = extractedErrors[keys[keys.length - 1]];
      }
    }
    errorObj.data = extractedErrors;
    errorObj.message = errorMsg;
    if (error && error.response && error.response.status) {
      errorObj.status = error.response.status;
    }
    return Promise.reject(errorObj);
  }
);

export default instance;
