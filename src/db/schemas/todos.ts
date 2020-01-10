import mongoose from 'mongoose';

import commonFields from './common';
import { TODO_STATUS } from '../../types/todos';

import { formatTime } from '../../helper/time';


const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TodosSchema = new Schema({
  content: {
    type: String, required: true 
  },
  userId: {
    type: ObjectId, required: true 
  },
  status: {
    type: String, default: TODO_STATUS.PENDING 
  },
  remark: {
    type: String, default: '' 
  },
  ...commonFields 
});


TodosSchema.methods.toJSON = function() {
  let result = this.toObject();
  result.id = result._id;
  result.createTime = formatTime(result.createTime);
  result.updateTime = formatTime(result.updateTime);
  delete result._id;
  delete result.__v;
  delete result.disabled;
  delete result.deleted;
  return result;
};

const TodosModel = mongoose.model('todos', TodosSchema);

export default TodosModel;
