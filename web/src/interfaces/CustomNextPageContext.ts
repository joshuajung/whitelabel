import { NextPageContext } from "next"
import { StoreInstance } from "../store/RootStore"

export interface ICustomNextPageContext extends NextPageContext {
  store?: StoreInstance
}
