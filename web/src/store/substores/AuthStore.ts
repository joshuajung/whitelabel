import { action, computed, observable } from "mobx";
import * as Nookies from "nookies";
import { IRootStore } from "../RootStore";
import { SignInPostRequestDto } from "../../shared/dtos/signIn.post.request.dto";
import { serializable } from "serializr";

export class AuthStore {
  @observable @serializable public sessionToken?: string;
  @computed public get isSignedIn(): boolean {
    return !!this.sessionToken;
  }
  @action public setToken = (token: string) => {
    this.sessionToken = token;
    Nookies.setCookie(null, "wljwt", token, {
      maxAge: 365 * 24 * 60 * 60,
      path: "/",
    });
  };
  @action public unsetToken = () => {
    this.sessionToken = undefined;
    Nookies.destroyCookie(null, "wljwt", {});
  };
  public signIn = async (rs: IRootStore, dto: SignInPostRequestDto) => {
    const result = await rs.apiService.post("auth/signIn", dto);
    this.setToken(result.data.accessToken);
  };
}
export interface IAuthStore extends AuthStore {}
