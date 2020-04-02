import makeInspectable from "mobx-devtools-mst"
import { addMiddleware, IMiddlewareHandler, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { AuthStore } from "./substores/AuthStore"
import { CounterStore } from "./substores/CounterStore"
import { ApiService } from "./services/ApiService"
import { HttpService } from "./services/HttpService"

export type StoreInstance = Instance<typeof RootStore>
export type StoreSnapshotIn = SnapshotIn<typeof RootStore>
export type StoreSnapshotOut = SnapshotOut<typeof RootStore>

export const RootStore = types.model({
  counterStore: types.optional(CounterStore, {}),
  authStore: types.optional(AuthStore, {}),
  httpService: types.optional(HttpService, {}),
  apiService: types.optional(ApiService, {})
})

// This is something we only to for Next.js in this complexity. It's not required by MST/Mobx.
export const initializeStore = (snapshot?: StoreSnapshotIn): StoreInstance => {
  let store = RootStore.create(snapshot)
  makeInspectable(store)
  return store
}
