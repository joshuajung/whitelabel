import { applySnapshot, Instance, SnapshotIn, SnapshotOut, types, flow } from "mobx-state-tree"
import makeInspectable from "mobx-devtools-mst"
import { CounterStore } from "./CounterStore"
import { AuthStore } from "./AuthStore"

export type StoreInstance = Instance<typeof RootStore>
export type StoreSnapshotIn = SnapshotIn<typeof RootStore>
export type StoreSnapshotOut = SnapshotOut<typeof RootStore>

export const RootStore = types.model({
  counterStore: types.optional(CounterStore, {}),
  authStore: types.optional(AuthStore, {})
})

// This is something we only to for Next.js in this complexity. It's not required by MST/Mobx.
export const initializeStore = (snapshot?: StoreSnapshotIn): StoreInstance => {
  let store = RootStore.create()
  makeInspectable(store)
  // If a snapshot is provided, apply the snapshot to the store
  if (snapshot) {
    applySnapshot(store, snapshot)
  }
  return store
}
