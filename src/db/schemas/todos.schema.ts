import mongoose, { Document } from 'mongoose';

import { TodosSchemaInterface } from '../../interfaces/schemas/todos.schema.interface';
import { commonOptions, commonFields } from '../common';

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
    type: String,
    required: true
  },
  ...commonFields
}, {
  ...commonOptions
});

const TodosModel = mongoose.model<TodosSchemaInterface & Document>('todos', TodosSchema);

export default TodosModel;
