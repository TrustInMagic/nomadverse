import mongoose, { Schema, Document } from 'mongoose';
import { UserInterface } from '../../../types/models';
// -------------------------------------------------- //

interface UserInterfaceExtended extends UserInterface, Document {}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  first_name: {
    type: String,
    required: true,
    minLength: 2,
  },
  last_name: { type: String, required: true, minLength: 2 },
  role: {
    type: String,
    enum: ['user', 'admin', 'writer'],
    default: 'user',
  },
});

userSchema.virtual('url').get(function () {
  return `/user/${this._id}`;
});

export default mongoose.model<UserInterfaceExtended>('User', userSchema);
