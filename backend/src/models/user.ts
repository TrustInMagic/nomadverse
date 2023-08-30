import mongoose, { Schema, Document } from 'mongoose';
// -------------------------------------------------- //

export interface UserInterface extends Document {
  email: string;
  username: string;
  password: string;
  firs_name: string;
  last_name: string;
  role: string;
  url: string;
}

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

export default mongoose.model<UserInterface>('User', userSchema);
