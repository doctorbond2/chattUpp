import { Schema, model } from "mongoose";
import { hash_password } from "../middleware/auth.middleware.js";
const userSchema = new Schema(
  {
    username: {
      type: String,
      maxLength: 30,
      minLength: 2,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "none",
    },
    role: {
      type: String,
      required: true,
      default: "standard",
    },
  },
  { timestamps: true }
);

userSchema.virtual("fullname").get(function () {
  return (
    this.firstname.charAt(0).toUpperCase() +
    " " +
    this.lastname.charAt(0).toUpperCase()
  );
});
// TODO
// ANVÄND PRESAVE FÖR ATT IMPLEMENTERA BILDER!
//PRE SAVE FÖR ATT KOLLA SPRÅKET -> AJA BAJA!!!
userSchema.pre("save", hash_password);
// userSchema.pre("save");
const User = model("User", userSchema);

export default User;
