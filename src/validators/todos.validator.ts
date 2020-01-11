import { Length } from 'class-validator';
import todosForms from '../forms/todos.forms';

const { content, remark } = todosForms;

export class TodosCreateUpdateValidator {
  @Length(content.minLength, content.maxLength,{
    message: content.lengthMessage
  })
  public content: string;

  @Length(remark.minLength, remark.maxLength,{
    message: remark.lengthMessage
  })
  public remark: string;
}
