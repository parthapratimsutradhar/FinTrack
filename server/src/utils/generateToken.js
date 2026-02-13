import jwt from "jsonwebtoken";

const generateToken = (payload, options = {}) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: options.expiresIn || "7d",
    }
  );
};

export default generateToken;
