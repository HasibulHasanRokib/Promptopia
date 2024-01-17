import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique:true
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.Users || mongoose.model("Users", userSchema);

export default UserModel;
