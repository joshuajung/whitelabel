import { types, Instance, flow, getParentOfType } from "mobx-state-tree";
import { IApiService } from "../services/ApiService";
import { RootStore, IRootStore } from "../RootStore";
import { ISignInFormData } from "../models/SignInFormData";
import { AxiosResponse } from "axios";
import { SignInPostResponseDto } from "../../shared/dtos/signIn.post.response.dto";

export const AuthStore = types
  .model({ sessionToken: types.maybe(types.string) })
  .views((self) => ({
    get isSignedIn() {
      return !!self.sessionToken;
    },
  }))
  .actions((self) => {
    // Private
    const rootStore: IRootStore = getParentOfType(self, RootStore);
    const apiService: IApiService = rootStore.apiService;
    // Public
    const setToken = (token: string) => {
      self.sessionToken = token;
    };
    const unsetToken = () => {
      self.sessionToken = undefined;
    };
    const signIn = flow(function* (data: ISignInFormData) {
      const result: AxiosResponse<SignInPostResponseDto> = yield apiService.post(
        "auth/signIn",
        data.dto
      );
      setToken(result.data.accessToken);
    });
    return { signIn, setToken, unsetToken };
  });
// We need these interfaces, see https://github.com/mobxjs/mobx-state-tree/issues/1406
export interface IAuthStore extends Instance<typeof AuthStore> {}
