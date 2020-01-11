import { IsEmail, Length } from 'class-validator';
import accountForms from '../forms/account.forms';

const {
  email, password, rePassword 
} = accountForms;

export class AccountLoginValidator {
  @Length(email.minLength, email.maxLength,{
    message: email.lengthMessage
  })
  @IsEmail()
  public email: string;

  @Length(password.minLength, password.maxLength,{
    message: password.lengthMessage
  })
  public password: string;
}

export class AccountRegisterValidator extends AccountLoginValidator{

  @Length(password.minLength, password.maxLength,{
    message: rePassword.notSameMessage
  })
  public rePassword: string;
}
