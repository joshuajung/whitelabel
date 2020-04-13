import Axios from "axios";
import { IRootStore } from "../RootStore";

export class HttpService {
  private rootStore: IRootStore;
  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }

  public get = async (url: string, bearerToken?: string) => {
    return Axios.get(url, {
      headers: bearerToken ? { Authorization: `Bearer: ${bearerToken}` } : {},
    });
  };

  public post = async (url: string, body: any, bearerToken?: string) => {
    return Axios.post(url, body, {
      headers: bearerToken ? { Authorization: `Bearer: ${bearerToken}` } : {},
    });
  };
}
export interface IHttpService extends HttpService {}
