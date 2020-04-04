import { types, getParentOfType } from "mobx-state-tree"
import { RootStore } from "../RootStore"

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
    const countUpBy = (step: number) => {
      self.value += step
    }
    return { countUp, countUpBy }
  })
