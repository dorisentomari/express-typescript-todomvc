import mongoose, { Document } from 'mongoose';

import Todos from '../../interfaces/schemas/todos';
import commonSchema from '../common';

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

const TodosModel = mongoose.model<Todos & Document>('todos', TodosSchema);

export default TodosModel;
