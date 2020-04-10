import { AuthorsService } from "./authors.service";
import { Module } from "@nestjs/common";
import { AuthorsResolver } from "./authors.resolver";

@Module({
  imports: [],
  providers: [AuthorsService, AuthorsResolver],
})
export class AuthorsModule {}
