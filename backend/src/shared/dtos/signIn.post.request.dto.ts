import { IsEmail, IsString } from "class-validator";

export class SignInPostRequestDto {
  @IsEmail()
  // This property is called "username", because it's what Passport's LocalStrategy expects as a default.
  username!: string;
  @IsString()
  password!: string;
}
