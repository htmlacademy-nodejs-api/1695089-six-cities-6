import {Schema, Document, model} from 'mongoose';
import {User} from '../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [2, 'Min length for firstname is 2']
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    require: true
  },
  avatarPath: {
    type: String,
    required: true,
    minlength: [5, 'Min length for avatar path is 5'],
  },
  status: String,
}, {timestamps: true});


export const UserModel = model<UserDocument>('User', userSchema);
