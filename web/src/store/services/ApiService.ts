import {
  flow,
  getParentOfType,
  Instance,
  types,
  getEnv,
} from "mobx-state-tree";
import { RootStore, IRootStore } from "../RootStore";
import { IAuthStore } from "../substores/AuthStore";
import { IHttpService } from "./HttpService";
import { IRuntimeConfig } from "../../interfaces/RuntimeConfig";
import { AxiosError } from "axios";

export const ApiService = types
  .model()
  .views((self) => ({
    get sessionToken(): string | undefined {
      const authStore: IAuthStore = getParentOfType(self, RootStore).authStore;
      return authStore.sessionToken;
    },
  }))
  .volatile((self) => {
    // Private
    const rootStore: IRootStore = getParentOfType(self, RootStore);
    const httpService: IHttpService = rootStore.httpService;
    const config = getEnv(self).config as IRuntimeConfig;
    const baseErrorHandler = (error: AxiosError) => {
      console.warn("API Base Error Handler:", error, error.response);
      // This will always be triggered when an error occurs.
    };
    // Public
    const get = flow(function* (endpoint: string) {
      try {
        return yield httpService.get(
          `${config.publicRuntimeConfig.apiUrl}/${endpoint}`,
          self.sessionToken
        );
      } catch (error) {
        baseErrorHandler(error);
        throw error;
      }
    });
    const post = flow(function* (endpoint: string, body: any) {
      try {
        return yield httpService.post(
          `${config.publicRuntimeConfig.apiUrl}/${endpoint}`,
          body,
          self.sessionToken
        );
      } catch (error) {
        baseErrorHandler(error);
        throw error;
      }
    });
    return { get, post };
  });
export interface IApiService extends Instance<typeof ApiService> {}
