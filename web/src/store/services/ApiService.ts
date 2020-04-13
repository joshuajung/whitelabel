import { AxiosError } from "axios";
import { computed } from "mobx";
import { IRootStore } from "../RootStore";

export class ApiService {
  private rootStore: IRootStore;
  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }
  @computed private get sessionToken(): string | undefined {
    return this.rootStore.authStore.sessionToken;
  }

  private baseErrorHandler = (error: AxiosError) => {
    console.warn("API Base Error Handler:", error, error.response);
    // This will always be triggered when an error occurs.
  };

  public get = async (endpoint: string) => {
    try {
      return await this.rootStore.httpService.get(
        `${this.rootStore.config.publicRuntimeConfig.apiUrl}/${endpoint}`,
        this.sessionToken
      );
    } catch (error) {
      this.baseErrorHandler(error);
      throw error;
    }
  };

  public post = async (endpoint: string, body: any) => {
    try {
      return await this.rootStore.httpService.post(
        `${this.rootStore.config.publicRuntimeConfig.apiUrl}/${endpoint}`,
        body,
        this.sessionToken
      );
    } catch (error) {
      this.baseErrorHandler(error);
      throw error;
    }
  };
}
export interface IApiService extends ApiService {}
