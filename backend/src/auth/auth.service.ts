import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as crypto from "crypto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<string | null> {
    const user = await this.userService.findOne(email);
    // Add hashing
    const hash = crypto.createHash("sha256").update(password).digest("base64");
    if (user && user.passwordHash === hash) {
      return user.email;
    }
    return null;
  }

  async login(validationResult: string | null) {
    const payload = { sub: validationResult };
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    };
  }
}
