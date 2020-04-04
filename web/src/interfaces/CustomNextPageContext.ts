import { NextPageContext } from "next"
import { StoreInstance } from "../store/RootStore"

export interface CustomNextPageContext extends NextPageContext {
  store?: StoreInstance
}
