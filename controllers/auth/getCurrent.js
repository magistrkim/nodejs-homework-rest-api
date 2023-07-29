import { ctrlWrapper } from "../../helpers/index.js";

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

export default {
  getCurrent: ctrlWrapper(getCurrent),
};
