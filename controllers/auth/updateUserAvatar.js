import User from "../../models/user.js";
import Jimp from "jimp";
import { ctrlWrapper } from "../../helpers/index.js";
import fs from "fs/promises";
import path from "path";

const updateUserAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const fileName = `${_id}_${originalname}`;
  const avatarsPath = path.resolve("public", "avatars", fileName);
  const avatarURL = path.join("avatars", fileName);
  try {
    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250);
    await image.writeAsync(tempUpload);
    await fs.rename(tempUpload, avatarsPath);
  } catch (error) {
    await fs.unlink(tempUpload);
    return error;
  }

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

export default {
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
};
