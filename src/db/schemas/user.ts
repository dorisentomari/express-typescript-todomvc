import mongoose from 'mongoose';
import md5 from 'md5';
import bcrypt from 'bcrypt';

import commonFields from './common';
import CONSTANT from '../../constant';
import { randomStr } from '../../helper/random';

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: { type: String, default: md5(randomStr()) },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  ...commonFields
});

UserSchema.pre('save', function (next) {
  let user: any = this;
  user.updateTime = new Date();
  if (user.isNew) {
    user.createTime = user.updateTime = Date.now();
  } else {
    user.updateTime = Date.now();
  }
  if (user.isNew || user.isModified('password')) {
    user.password = bcrypt.hashSync(user.password, CONSTANT.SAFE_WORK_FACTOR);
  }
  return next();
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
