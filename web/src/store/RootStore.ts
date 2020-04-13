import { computed, transaction } from "mobx";
import getConfig from "next/config";
import React from "react";
import { object, serializable, update } from "serializr";
import { IRuntimeConfig } from "../interfaces/RuntimeConfig";
import { ApiService } from "./services/ApiService";
import { HttpService } from "./services/HttpService";
import { AuthStore } from "./substores/AuthStore";
import { CounterStore } from "./substores/CounterStore";
import { DevStore } from "./substores/DevStore";

export class RootStore {
  @serializable(object(AuthStore))
  public authStore: AuthStore;
  @serializable(object(CounterStore))
  public counterStore: CounterStore;
  public devStore: DevStore;

  public apiService: ApiService;
  public httpService: HttpService;

  constructor() {
    this.authStore = new AuthStore();
    this.counterStore = new CounterStore();
    this.devStore = new DevStore();
    this.apiService = new ApiService(this);
    this.httpService = new HttpService(this);
  }

  @computed public get config(): IRuntimeConfig {
    return getConfig();
  }
}
export interface IRootStore extends RootStore {}
export type SerializedRootStore = unknown;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const RootStoreContext = React.createContext<RootStore>(undefined!);

export const initializeStore = (snapshot?: SerializedRootStore): RootStore => {
  const store = new RootStore();
  try {
    if (snapshot) {
      transaction(() => {
        update(RootStore, store, snapshot, () =>
          console.log("Deserialization is complete.")
        );
      });
    }
  } catch (error) {}
  return store;
};
