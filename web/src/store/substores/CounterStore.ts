import { action, observable, runInAction } from "mobx";
import { IRootStore } from "../RootStore";
import { Counter } from "../models/Counter";
import { serializable, object, list } from "serializr";

export class CounterStore {
  @observable
  @serializable(list(object(Counter)))
  public counters: Counter[] = [];

  @action public fetchCounters = async (rs: IRootStore) => {
    const result = await rs.apiService.get("demoDtoList");
    runInAction(
      () => (this.counters = result.data.map((c: any) => Counter.fromDto(c)))
    );
  };

  @action public fetchCounter = async (rs: IRootStore, counterId: string) => {
    const result = await rs.apiService.get(counterId);
    this.counters.filter((c) => c.id !== result.data.id);
    this.counters.push(Counter.fromDto(result.data));
  };
}
export interface ICounterStore extends CounterStore {}
