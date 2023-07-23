import { Schema, model } from "mongoose";
import { handleSaveError, handleUpdateValidate } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    // position: {
    //        type: String,
    //        enum: ["CEO", "counter", "designer", "developer", "project manager"],
    //        required: true,
    // },
    // yearOfBirth: {
    //        type: String,
    //        match: /^\d{4}$/,
    // },
  },
  { versionKey: false, timestamps: true }
);

//pre hook for validate during updating contacts
contactSchema.pre("findOneAndUpdate", handleUpdateValidate);

// "save" into database and handle error - will work if save is unsuccess
contactSchema.post("save", handleSaveError);
contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

export default Contact;
