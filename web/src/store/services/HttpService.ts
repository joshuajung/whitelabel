import Axios from "axios";
import { flow, Instance, types } from "mobx-state-tree";

export const HttpService = types.model().volatile(() => ({
  get: flow(function* (url: string, bearerToken?: string) {
    return yield Axios.get(url, {
      headers: bearerToken ? { Authorization: `Bearer: ${bearerToken}` } : {},
    });
  }),
  post: flow(function* (url: string, body: any, bearerToken?: string) {
    return yield Axios.post(url, body, {
      headers: bearerToken ? { Authorization: `Bearer: ${bearerToken}` } : {},
    });
  }),
}));
export interface IHttpService extends Instance<typeof HttpService> {}
