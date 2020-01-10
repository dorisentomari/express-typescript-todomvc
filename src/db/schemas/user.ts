import mongoose from 'mongoose';
import md5 from 'md5';
import bcrypt from 'bcrypt';

import commonFields from './common';
import CONSTANT from '../../constant';
import { randomStr } from '../../helper/random';

import { formatTime } from '../../helper/time';

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: {
    type: String, default: md5(randomStr()) 
  },
  password: {
    type: String, required: true 
  },
  email: {
    type: String, required: true, unique: true 
  },
  avatar: {
    type: String, required: true 
  },
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

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
