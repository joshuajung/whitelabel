import { types, Instance } from "mobx-state-tree";
import { SignInPostRequestDto } from "../../shared/dtos/signIn.post.request.dto";

export const SignInFormData = types
  .model({ email: "", password: "", signingIn: false, signInFailed: false })
  .views((self) => ({
    get dto() {
      const dto = new SignInPostRequestDto();
      dto.username = self.email;
      dto.password = self.password;
      return dto;
    },
  }))
  .actions((self) => ({
    setEmail: (v: string) => {
      self.email = v;
    },
    setPassword: (v: string) => {
      self.password = v;
    },
    setSigningIn: (v: boolean) => {
      self.signingIn = v;
    },
    setSignInFailed: (v: boolean) => {
      self.signInFailed = v;
    },
  }));
export interface ISignInFormData extends Instance<typeof SignInFormData> {}
