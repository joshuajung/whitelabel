import { IsEmail, IsString } from "class-validator";
import { observable } from "mobx";

export class SignInPostRequestDto {
  @IsEmail()
  @observable
  // This property is called "username", because it's what Passport's LocalStrategy expects as a default.
  username: string = "";
  @IsString()
  @observable
  password: string = "";
}
