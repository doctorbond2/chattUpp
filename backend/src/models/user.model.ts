import { Schema, model } from "mongoose";
import { hashHelper } from "../utilities/helpers/auth.helpers.js";
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
      maxLength: 255,
      minLength: 8,
      match: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      required: true,
    },
    firstname: {
      type: String,
      maxLength: 100,
      minLength: 1,
      required: true,
    },
    lastname: {
      type: String,
      maxLength: 100,
      minLength: 1,
      required: true,
    },
    age: {
      type: Number,
      min: 15,
      max: 125,
      default: null,
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
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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
userSchema.pre("save", hashHelper);
// userSchema.pre("save");
const User = model("User", userSchema);

export default User;
