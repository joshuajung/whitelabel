import { applySnapshot, Instance, SnapshotIn, SnapshotOut, types, flow } from "mobx-state-tree"
import Axios, { AxiosResponse } from "axios"

export type StoreInstance = Instance<typeof Store>
export type StoreSnapshotIn = SnapshotIn<typeof Store>
export type StoreSnapshotOut = SnapshotOut<typeof Store>

export const Counter = types
  .model({
    id: types.identifier,
    name: types.string,
    currentTime: types.Date,
    value: types.integer
  })
  .actions(self => {
    const countUp = () => {
      self.value++
    }
    return { countUp }
  })

const Store = types
  .model({
    counters: types.map(Counter)
  })
  .actions(self => {
    const fetchCounters = flow(function*() {
      try {
        const result: AxiosResponse = yield Axios.get("http://localhost:3000/demoDtoList")
        result.data.forEach((c: any) => {
          self.counters.put(c)
        })
      } catch (error) {
        console.error("Failed to fetch counters", error)
      }
    })
    const fetchCounter = flow(function*(counterId: string) {
      try {
        const result: AxiosResponse = yield Axios.get(`http://localhost:3000/${counterId}`)
        self.counters.put(result.data)
      } catch (error) {
        console.error("Failed to fetch counters", error)
      }
    })
    return { fetchCounters, fetchCounter }
  })

const storeDefaults: StoreSnapshotIn = {
  counters: { "default-counter": { id: "default-counter", name: "Default Counter", currentTime: new Date(), value: 0 } }
}

// This is something we only to for Next.js in this complexity. It's not required by MST/Mobx.
export const initializeStore = (isServer: boolean, snapshot?: StoreSnapshotIn) => {
  let store: StoreInstance | null = null
  // If we are on the server, create a store from scratch
  if (isServer) {
    store = Store.create(storeDefaults)
  }
  // If there is no store instance yet, create a store instance
  if (store === null) {
    store = Store.create(storeDefaults)
  }
  // If a snapshot is provided, apply the snapshot to the store
  if (snapshot) {
    applySnapshot(store, snapshot)
  }
  return store
}
