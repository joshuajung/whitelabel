import { action, observable } from "mobx";
import { serializable } from "serializr";

export class Counter {
  @serializable public id!: string;
  @serializable public name!: string;
  @serializable public currentTime!: Date;
  @observable @serializable public value!: number;

  @action public countUp = () => {
    this.value++;
  };

  @action public countUpBy = (step: number) => {
    this.value += step;
  };

  static fromDto = (dto: any): Counter => {
    const counter = new Counter();
    counter.id = dto.id;
    counter.name = dto.name;
    counter.currentTime = dto.currentTime;
    counter.value = dto.value;
    return counter;
  };
}
