import mongoose, { Schema } from 'mongoose';
import { USER_Role } from './user.contant';
import { Tuser } from './user.interface';

const userSchema: Schema<Tuser> = new Schema({
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'password is required'],
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  number: {
    type: String,
    unique: true,
  },
  profile_image: {
    type: String,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: Object.keys(USER_Role),
  },
  refreshToken: { type: String },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
export const User =
  (mongoose.models.User as mongoose.Model<Tuser>) || mongoose.model<Tuser>('User', userSchema);
