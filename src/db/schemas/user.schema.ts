import mongoose, { Document } from 'mongoose';
import md5 from 'md5';

import UserInterface from '../../interfaces/schemas/user.schema.interface';
import { commonOptions, commonFields } from '../common';
import { randomStr } from '../../helpers/random';

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
  ...commonFields
}, {
  ...commonOptions
});

const UserModel = mongoose.model<UserInterface & Document>('user', UserSchema);


export default UserModel;
