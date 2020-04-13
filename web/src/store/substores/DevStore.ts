import { observable } from "mobx";
import { serializable } from "serializr";

export class DevStore {
  @observable @serializable public testString?: string;
  // @observable public counters: Counter[] = [];

  // @action public fetchCounters = async () => {
  //   const result = await this.rootStore.apiService.get("demoDtoList");
  //   runInAction(() => (this.counters = result.data));
  // };

  // @action public fetchCounter = async (counterId: string) => {
  //   const result = await this.rootStore.apiService.get(counterId);
  //   this.counters.filter((c) => c.id !== result.data.id);
  //   this.counters.push(result.data);
  // };
}
export interface IDevStore extends DevStore {}
