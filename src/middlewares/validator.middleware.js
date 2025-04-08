import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log("errors", errors);
  console.log("errors type", typeof errors);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({
    [err.param]: err.msg
  }));

  throw new ApiError(422, "Validation Error", extractedErrors);
}