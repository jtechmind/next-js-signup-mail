import { timeStamp } from "console";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { type } from "os";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true],
    unique: [true],
  },
  email: {
    type: String,
    required: [true],
    unique: [true],
  },
  password: {
    type: String,
    required: [true],
    unique: [true],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpirty: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
