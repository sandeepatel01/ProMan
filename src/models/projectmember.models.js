import mongoose from "mongoose";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants";

const projectmemberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: AvailableUserRoles,
    default: UserRolesEnum.MEMBER
  }
}, { timestamps: true });

export const Projectmember = mongoose.model("Projectmember", projectmemberSchema);