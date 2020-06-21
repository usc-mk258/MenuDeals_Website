import * as revalidator from 'revalidator';

const validator = (obj, schema) => {
  const error = revalidator.validate(obj, schema);
  return error.errors[0];
}

export default validator;