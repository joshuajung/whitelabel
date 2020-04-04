import { types, Instance } from "mobx-state-tree"
import SignInPostRequestDto from "../../shared/dtos/signIn.post.request.dto"

export interface ISignInFormData extends Instance<typeof SignInFormData> {}
export const SignInFormData = types
  .model({ email: "", password: "" })
  .views((self) => ({
    get dto() {
      const dto = new SignInPostRequestDto()
      dto.email = self.email
      dto.password = self.password
      return dto
    },
  }))
  .actions((self) => ({
    setEmail: (v: string) => {
      self.email = v
    },
    setPassword: (v: string) => {
      self.password = v
    },
  }))
