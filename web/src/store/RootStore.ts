import makeInspectable from "mobx-devtools-mst"
import getConfig from "next/config"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { ApiService } from "./services/ApiService"
import { HttpService } from "./services/HttpService"
import { AuthStore } from "./substores/AuthStore"
import { CounterStore } from "./substores/CounterStore"
import { IRuntimeConfig } from "../interfaces/RuntimeConfig"

const config: IRuntimeConfig = getConfig()
export type StoreInstance = Instance<typeof RootStore>
export type StoreSnapshotIn = SnapshotIn<typeof RootStore>
export type StoreSnapshotOut = SnapshotOut<typeof RootStore>

export interface IRootStore extends StoreInstance {}
export const RootStore = types.model({
  counterStore: types.optional(CounterStore, {}),
  authStore: types.optional(AuthStore, {}),
  httpService: types.optional(HttpService, {}),
  apiService: types.optional(ApiService, {}),
})

// This is something we only to for Next.js in this complexity. It's not required by MST/Mobx.
export const initializeStore = (snapshot?: StoreSnapshotIn): StoreInstance => {
  let store = RootStore.create(snapshot, { config })
  makeInspectable(store)
  return store
}
