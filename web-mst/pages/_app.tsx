import { Provider } from "mobx-react"
import { getSnapshot } from "mobx-state-tree"
import App, { AppContext, AppInitialProps, AppProps } from "next/app"
import React from "react"
import { initializeStore, StoreInstance, StoreSnapshotOut } from "../stores/store"
import { NextPageContext } from "next"

interface CustomProps {
  isServer: boolean
  initialState: StoreSnapshotOut
}

export interface MyNextPageContext extends NextPageContext {
  store?: StoreInstance
}
export type MyAppContext = AppContext & { ctx: MyNextPageContext }

class MyApp extends App<CustomProps> {
  // This is where we keep our store
  private store: StoreInstance

  constructor(props: CustomProps & AppProps) {
    super(props)
    this.store = initializeStore(props.isServer, props.initialState) as StoreInstance
  }

  public static getInitialProps = async (appContext: MyAppContext): Promise<CustomProps & AppInitialProps> => {
    //
    // Use getInitialProps as a step in the lifecycle when
    // we can initialize our store
    //
    const isServer = typeof window === "undefined"
    const store = initializeStore(isServer)
    // Create an extended app context that includes the store
    appContext.ctx.store = store

    //
    // Check whether the page being rendered by the App has a
    // static getInitialProps method and if so call it
    //
    let pageProps = {}
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }
    return {
      initialState: getSnapshot(store),
      isServer,
      pageProps
    }
  }

  public render() {
    return (
      <Provider store={this.store}>
        <this.props.Component {...this.props.pageProps} />
      </Provider>
    )
  }
}

export default MyApp
