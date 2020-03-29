import { observable, action } from "mobx"

export class Counter {
  public id!: string
  @observable public name!: string
  @observable public currentTime!: string
  @observable public value = 0

  constructor(id: string, name: string, currentTime: string) {
    this.id = id
    this.name = name
    this.currentTime = currentTime
  }

  @action
  public countUp = () => {
    this.value++
  }
}
