import { AxiosResponse } from "axios";
import { flow, getParentOfType, Instance, types } from "mobx-state-tree";
import { Counter } from "../models/Counter";
import { RootStore } from "../RootStore";
import { IApiService } from "../services/ApiService";

export const CounterStore = types
  .model({
    counters: types.map(Counter),
  })
  .actions((self) => {
    const apiService: IApiService = getParentOfType(self, RootStore).apiService;
    const fetchCounters = flow(function* () {
      const result: AxiosResponse = yield apiService.get("demoDtoList");
      result.data.forEach((c: any) => {
        self.counters.put(c);
      });
    });
    const fetchCounter = flow(function* (counterId: string) {
      const result = yield apiService.get(counterId);
      self.counters.put(result.data);
    });
    return { fetchCounters, fetchCounter };
  });
export interface ICounterStore extends Instance<typeof CounterStore> {}
