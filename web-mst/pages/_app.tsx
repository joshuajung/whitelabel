import { Provider } from "mobx-react"
import { getSnapshot } from "mobx-state-tree"
import App, { AppContext } from "next/app"
import React from "react"
import { initializeStore, StoreInstance, StoreSnapshotOut } from "../stores/store"

interface Props {
  isServer: boolean
  initialState: StoreSnapshotOut
  pageProps: any
}

class MyApp extends App {
  // This is where we keep our store
  private store: StoreInstance

  constructor(props: any) {
    super(props)
    this.store = initializeStore(props.isServer, props.initialState) as StoreInstance
  }

  public static getInitialProps = async (appContext: AppContext): Promise<Props> => {
    //
    // Use getInitialProps as a step in the lifecycle when
    // we can initialize our store
    //
    const isServer = typeof window === "undefined"
    const store = initializeStore(isServer)
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
