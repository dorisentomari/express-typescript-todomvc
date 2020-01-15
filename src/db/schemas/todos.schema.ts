import mongoose, { Document } from 'mongoose';

import TodosSchemaInterface from '../../interfaces/schemas/todos.schema.interface';
import commonSchema from '../common';
import { formatTime } from '../../helper/time';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TodosSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: ObjectId,
    required: true
  },
  status: {
    type: String
  },
  ...commonSchema
});

const TodosModel = mongoose.model<TodosSchemaInterface & Document>('todos', TodosSchema);

TodosSchema.methods.toJSON = function() {
  let result = this.toObject();
  result.id = result._id;
  result.createTime = formatTime(result.createTime);
  result.updateTime = formatTime(result.updateTime);
  delete result._id;
  delete result.__v;
  return result;
};

export default TodosModel;
