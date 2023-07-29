import jwt from "jsonwebtoken";
import "dotenv/config";
import { ctrlWrapper, HttpError } from "../helpers/index.js";
import User from "../models/user.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized - Invalid token format");
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401, "Not authorized - User not found in database");
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    throw HttpError(401, "Not authorized - Invalid token");
  }
};

export default ctrlWrapper(authenticate);
