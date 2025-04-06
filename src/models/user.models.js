import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  fullname: {
    type: String,
    required: true
  },
  avatar: {
    type: {
      url: String,
      localpath: String
    },
    default: {
      url: `https://placehold.co/600x400`,
      localpath: ""
    }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: {
    type: String
  },
  forgotPasswordTokenExpiry: {
    type: Date
  },
  refreshToken: {
    type: String
  },
  emailVerificationToken: {
    type: String
  },
  emailVerificationTokenExpiry: {
    type: Date
  }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);