import mongoose, { Document } from 'mongoose';
import md5 from 'md5';

import UserInterface from '../../interfaces/schemas/user';
import commonSchema from '../common';

import { randomStr } from '../../helper/random';

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: {
    type: String,
    default: md5(randomStr())
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true, unique: true
  },
  avatar: {
    type: String,
    required: true
  },
  ...commonSchema
});

const UserModel = mongoose.model<UserInterface & Document>('user', UserSchema);

export default UserModel;
