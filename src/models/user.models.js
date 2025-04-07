import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  )
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  )
};

userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex");
  const tokenExpiry = new Date() + (20 * 60 * 1000); // 20 minutes

  return {
    unHashedToken,
    hashedToken,
    tokenExpiry
  }
};


export const User = mongoose.model("User", userSchema);