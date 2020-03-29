import { NextPageContext } from "next"
import { StoreInstance } from "../stores/store"

export interface CustomNextPageContext extends NextPageContext {
  store?: StoreInstance
}
