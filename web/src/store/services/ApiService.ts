import { flow, getParentOfType, Instance, types, getEnv } from "mobx-state-tree"
import { RootStore, IRootStore } from "../RootStore"
import { IAuthStore } from "../substores/AuthStore"
import { IHttpService } from "./HttpService"
import { IRuntimeConfig } from "../../interfaces/RuntimeConfig"

export interface IApiService extends Instance<typeof ApiService> {}
export const ApiService = types
  .model()
  .views((self) => ({
    get sessionToken(): string | undefined {
      const authStore: IAuthStore = getParentOfType(self, RootStore).authStore
      return authStore.sessionToken
    },
  }))
  .volatile((self) => {
    // Private
    const rootStore: IRootStore = getParentOfType(self, RootStore)
    const httpService: IHttpService = rootStore.httpService
    const config = getEnv(self).config as IRuntimeConfig
    // Public
    const get = flow(function* (endpoint: string) {
      return httpService.get(`${config.publicRuntimeConfig.apiUrl}/${endpoint}`, self.sessionToken)
    })
    const post = flow(function* (endpoint: string, body: any) {
      return httpService.post(`${config.publicRuntimeConfig.apiUrl}/${endpoint}`, body, self.sessionToken)
    })
    return { get, post }
  })
