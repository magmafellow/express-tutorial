export const createUserValidationSchema = {
  username: {
    isLength: {
      options: { min: 3, max: 24 },
      errorMessage: 'username must be 3-24 characters',
    },
    notEmpty: {
      errorMessage: 'username can not be empty',
    },
    isString: {
      errorMessage: 'username must be a string',
    },
  },
  displayName: {
    isLength: {
      options: { min: 5, max: 32 },
      errorMessage: 'displayName must be 5-32 characters',
    },
    notEmpty: {
      errorMessage: 'displayName can not be empty',
    },
    isString: {
      errorMessage: 'displayName must be a string',
    },
  },
  password: {
    notEmpty: true,
  }
}

export const getUserValidationSchema = {
  filter: {
    isString: { errorMessage: 'filter field must be a string' },
  },
  value: {
    isString: { errorMessage: 'filter value field must be a string' },
  },
}
