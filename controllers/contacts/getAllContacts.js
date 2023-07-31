import Contact from "../../models/contact.js";
import { ctrlWrapper } from "../../helpers/index.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...query } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner, ...query },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");
  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
};
