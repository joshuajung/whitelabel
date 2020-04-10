import { Author } from "./models/author.model";
import { Injectable } from "@nestjs/common";
import { RenameAuthorInput } from "./authors.resolver";

@Injectable()
export class AuthorsService {
  private db: Author[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
    },
  ];

  findOneById(id: number): Author | undefined {
    return this.db.find((i) => i.id === id);
  }
  findAll(): Author[] {
    return this.db;
  }

  renameAuthor(input: RenameAuthorInput): Author | undefined {
    const old = this.db.find((i) => i.id === input.id);
    if (old) {
      this.db = this.db.filter((i) => i !== old);
      old.firstName = input.firstName;
      this.db.push(old);
      return old;
    }
  }
}
