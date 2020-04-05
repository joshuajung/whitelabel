import { NextPageContext } from "next";
import { IRootStore } from "../store/RootStore";

export interface ICustomNextPageContext extends NextPageContext {
  store?: IRootStore;
}
