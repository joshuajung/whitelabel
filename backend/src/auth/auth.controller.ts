import { Controller, UseGuards, Post, Request, Get } from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { SignInPostRequestDto } from "../shared/dtos/signIn.post.request.dto";
import { SignInPostResponseDto } from "../shared/dtos/signIn.post.response.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("signIn")
  async signIn(
    @Request() req: SignInPostRequestDto
  ): Promise<SignInPostResponseDto> {
    return this.authService.signIn();
  }

  @UseGuards(JwtAuthGuard)
  @Get("checkValidity")
  async checkValidity(): Promise<boolean> {
    return true;
  }
}
