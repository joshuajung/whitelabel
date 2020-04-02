import { types, flow, getParentOfType, Instance } from "mobx-state-tree"
import Axios, { AxiosResponse } from "axios"
import { RootStore } from "../RootStore"
import { IAuthStore } from "../substores/AuthStore"
import { IHttpService } from "./HttpService"

export interface IApiService extends Instance<typeof ApiService> {}
export const ApiService = types
  .model()
  .views(self => ({
    get sessionToken() {
      const authStore: IAuthStore = getParentOfType(self, RootStore).authStore
      return authStore.sessionToken
    }
  }))
  .volatile(self => {
    const httpService: IHttpService = getParentOfType(self, RootStore).httpService
    const get = flow(function*(endpoint: string) {
      return httpService.get("http://localhost:3000/" + endpoint, self.sessionToken)
    })
    const post = flow(function*(endpoint: string, body: any) {
      return httpService.post("http://localhost:3000/" + endpoint, body, self.sessionToken)
    })
    return { get, post }
  })
