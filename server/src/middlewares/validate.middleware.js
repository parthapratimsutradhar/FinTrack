import ApiError from "../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    throw new ApiError(
      400,
      "Validation failed",
      err.errors
    );
  }
};

export default validate;
