import User from "../../models/user.js";
import { HttpError, ctrlWrapper } from "../../helpers/index.js";
import { userSubscriptionSchema } from "../../schemas/user-schemas.js";

const updateUserSubscription = async (req, res) => {
  const { error } = userSubscriptionSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    // runValidators: true,
  });
  if (!result) {
    throw HttpError(404, `User with id=${id} not found`);
  }
  res.json(result);
};

export default {
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
};
