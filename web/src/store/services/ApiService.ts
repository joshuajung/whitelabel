import { flow, getParentOfType, Instance, types, getEnv } from "mobx-state-tree"
import { RootStore } from "../RootStore"
import { IAuthStore } from "../substores/AuthStore"
import { IHttpService } from "./HttpService"
import { RuntimeConfig } from "../../interfaces/RuntimeConfig"

export interface IApiService extends Instance<typeof ApiService> {}
export const ApiService = types
  .model()
  .views((self) => ({
    get sessionToken() {
      const authStore: IAuthStore = getParentOfType(self, RootStore).authStore
      return authStore.sessionToken
    },
  }))
  .volatile((self) => {
    // Private
    const httpService: IHttpService = getParentOfType(self, RootStore).httpService
    const config = getEnv(self).config as RuntimeConfig
    // Public
    const get = flow(function* (endpoint: string) {
      return httpService.get(config.publicRuntimeConfig.apiUrl + endpoint, self.sessionToken)
    })
    const post = flow(function* (endpoint: string, body: any) {
      return httpService.post(config.publicRuntimeConfig.apiUrl + endpoint, body, self.sessionToken)
    })
    return { get, post }
  })
