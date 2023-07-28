import { Schema, model } from "mongoose";
import { handleSaveError, handleUpdateValidate } from "./hooks.js";
import { emailRegexp } from "../constants/user-constants.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      minLength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    // token: String,

    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    // },
  },

  { versionKey: false, timestamps: true }
);
//pre hook for validate during updating contacts
userSchema.pre("findOneAndUpdate", handleUpdateValidate);

// "save" into database and handle error - will work if save is unsuccess
userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
