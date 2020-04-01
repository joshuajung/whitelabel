import { types, flow } from "mobx-state-tree"
import Axios, { AxiosResponse } from "axios"
import { Counter } from "./models/Counter"

export const CounterStore = types
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
        console.error("Failed to fetch counter", error)
      }
    })
    return { fetchCounters, fetchCounter }
  })
