import { Injectable } from "@nestjs/common";
import { User } from "../shared/interfaces/user.interface";

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor() {
    const users = [
      {
        email: "test@test.de",
        passwordHash: "n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=",
      },
    ];
    this.users = users;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email == email);
  }
}
