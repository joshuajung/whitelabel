import { IsEmail, IsString } from "class-validator";

class SignInPostRequestDto {
  @IsEmail()
  email!: string;
  @IsString()
  password!: string;
}

export default SignInPostRequestDto;
