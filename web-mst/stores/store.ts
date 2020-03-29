import { applySnapshot, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export type StoreInstance = Instance<typeof Store>
export type StoreSnapshotIn = SnapshotIn<typeof Store>
export type StoreSnapshotOut = SnapshotOut<typeof Store>

const Store = types
  .model({
    foo: types.number,
    lastUpdate: types.Date,
    light: types.boolean
  })
  .actions(self => {
    let timer: NodeJS.Timeout
    const start = () => {
      timer = setInterval(() => {
        ;(self as any).update()
      }, 1000)
    }
    const update = () => {
      self.lastUpdate = new Date(Date.now())
      self.light = true
    }
    const stop = () => {
      clearInterval(timer)
    }
    const countUp = () => {
      self.foo++
    }
    return { start, stop, update, countUp }
  })

const storeDefaults: StoreSnapshotIn = { foo: 6, lastUpdate: Date.now(), light: false }

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
