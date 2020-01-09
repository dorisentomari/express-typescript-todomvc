import mongoose from 'mongoose';
import commonFields from './common';
import { randomStr } from '../../helper/random';

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: { type: String, default: randomStr() },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  ...commonFields
});

UserSchema.pre('save', function (next) {
  let user:any = this;
  user.updateTime = new Date();
  if (user.isNew) {
    user.createTime = user.updateTime = Date.now();
  } else {
    user.updateTime = Date.now();
  }
  return next();
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
