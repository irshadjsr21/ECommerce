export default function validate(schema, object) {
  const errors = schema.validate(object, { abortEarly: false });
  console.log(errors);
  if (
    !(
      errors &&
      errors.error &&
      errors.error.details &&
      errors.error.details.length > 0
    )
  ) {
    return {};
  }

  const errorDetails = errors.error.details;

  const formattedError = {};

  for (const detail of errorDetails) {
    if (
      detail.message &&
      detail.path &&
      detail.path.length > 0 &&
      !formattedError[detail.path]
    ) {
      formattedError[detail.path] = detail.message;
    }
  }

  return formattedError;
}
