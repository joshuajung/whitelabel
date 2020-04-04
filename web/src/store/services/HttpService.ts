import Axios from "axios"
import { flow, Instance, types } from "mobx-state-tree"

export interface IHttpService extends Instance<typeof HttpService> {}
export const HttpService = types.model().volatile(self => ({
  get: flow(function*(url: string, bearerToken?: string) {
    const result = Axios.get(url, {
      headers: bearerToken ? { Authorization: `Bearer: ${bearerToken}` } : {}
    })
    return result
  }),
  post: flow(function*(url: string, body: any, bearerToken?: string) {
    const result = Axios.post(url, body, {
      headers: bearerToken ? { Authorization: `Bearer: ${bearerToken}` } : {}
    })
    return result
  })
}))
