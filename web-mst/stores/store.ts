import { applySnapshot, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

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
  .actions(self => ({
    countUp: () => {
      self.value++
    }
  }))

const Store = types.model({
  counters: types.map(Counter)
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
