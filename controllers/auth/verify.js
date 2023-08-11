import { HttpError, ctrlWrapper } from "../../helpers/index.js";
import User from "../../models/user.js";

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "Verify user not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.json({
    message: "Verification successful",
  });
};

export default {
  verify: ctrlWrapper(verify),
};
