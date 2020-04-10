import {
  Args,
  Int,
  Resolver,
  Query,
  Mutation,
  InputType,
  Field,
} from "@nestjs/graphql";
import { Author } from "./models/author.model";
import { AuthorsService } from "./authors.service";

@InputType()
export class RenameAuthorInput {
  @Field()
  id!: number;
  @Field()
  firstName!: string;
}

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private authorsService: AuthorsService) {}

  @Query((returns) => Author)
  async author(@Args("id", { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @Query((returns) => [Author])
  async authors() {
    return this.authorsService.findAll();
  }

  @Mutation((returns) => Author)
  async renameAuthor(
    @Args("renameAuthorInput") renameAuthorInput: RenameAuthorInput
  ) {
    return this.authorsService.renameAuthor(renameAuthorInput);
  }
}
