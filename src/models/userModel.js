import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Enter USer name"],
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
