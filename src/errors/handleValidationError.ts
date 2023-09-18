import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericResponseMessage } from '../interfaces/common';

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): IGenericResponseMessage => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    },
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'validation Error',
    errorMessage: errors,
  };
};

export default handleValidationError;
