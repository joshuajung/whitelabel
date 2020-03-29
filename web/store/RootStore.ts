import { observable, action, configure, runInAction } from "mobx"
import React from "react"
import { Counter } from "../models/counter"
import Axios from "axios"

configure({ enforceActions: "observed" })

interface Dto {
  id: string
  name: string
  currentTime: string
}

export class RootStore {
  @observable public counters: Counter[] = [new Counter("start-counter", "Start Counter", JSON.stringify(new Date()))]

  @action public getCounter = async (id: string) => {
    const result = await Axios.get("http://localhost:3000/" + id)
    const dto = result.data as Dto
    const counter = new Counter(dto.id, dto.name, dto.currentTime)
    runInAction(() => {
      this.counters = this.counters.filter(c => c.id !== counter.id)
      this.counters.push(counter)
    })
  }
}

export const rootStore = new RootStore()
export const RootStoreContext = React.createContext(rootStore)
