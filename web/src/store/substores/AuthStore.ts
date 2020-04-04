import { types, Instance, flow, getParentOfType } from "mobx-state-tree"
import { IApiService } from "../services/ApiService"
import { RootStore } from "../RootStore"
import { ISignInFormData } from "../models/SignInFormData"

// We need these interfaces, see https://github.com/mobxjs/mobx-state-tree/issues/1406
export interface IAuthStore extends Instance<typeof AuthStore> {}
export const AuthStore = types
  .model({ sessionToken: types.maybe(types.string) })
  .views((self) => ({
    get isSignedIn() {
      return !!self.sessionToken
    },
  }))
  .actions((self) => {
    // Private
    const apiService: any = getParentOfType(self, RootStore).apiService
    // Public
    const setToken = (token: string) => {
      self.sessionToken = token
    }
    const unsetToken = () => {
      self.sessionToken = undefined
    }
    const signIn = flow(function* (data: ISignInFormData) {
      yield apiService.post("signIn", data.dto)
    })
    return { signIn, setToken, unsetToken }
  })
