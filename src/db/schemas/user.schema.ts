import mongoose, { Document } from 'mongoose';
import md5 from 'md5';

import UserInterface from '../../interfaces/schemas/user.schema.interface';
import commonSchema from '../common';
import { formatTime } from '../../helpers/time';
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
  ...commonSchema
});

const UserModel = mongoose.model<UserInterface & Document>('user', UserSchema);

UserSchema.methods.toJSON = function() {
  let result = this.toObject();
  result.id = result._id;
  result.createTime = formatTime(result.createTime);
  result.updateTime = formatTime(result.updateTime);
  delete result._id;
  delete result.password;
  delete result.__v;
  return result;
};

export default UserModel;
