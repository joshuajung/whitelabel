import { Provider } from "mobx-react"
import { getSnapshot } from "mobx-state-tree"
import App, { AppContext, AppInitialProps, AppProps } from "next/app"
import React from "react"
import { ICustomNextPageContext } from "../interfaces/CustomNextPageContext"
import { initializeStore, StoreInstance, StoreSnapshotOut } from "../store/RootStore"
import * as Nookies from "nookies"

// Internal dependencies
import "../assets/styles/index.scss"
import AuthGate from "../auth/AuthGate"

interface CustomInitalProps {
  initialStoreSnapshot: StoreSnapshotOut
}
type InitialProps = AppInitialProps & CustomInitalProps
type Props = AppProps & CustomInitalProps

export type MyAppContext = AppContext & { ctx: ICustomNextPageContext }

class CustomApp extends App<Props> {
  // This is where we keep our store
  private store: StoreInstance

  public static getInitialProps = async (appContext: MyAppContext): Promise<InitialProps> => {
    // Initialize the store already on the server
    const store = initializeStore()
    // Add the store to the app context, so we can use it in getInitialProps of pages
    appContext.ctx.store = store
    // If a session token is provided via Cookie, copy it to the store
    const jwtCookie = Nookies.parseCookies(appContext.ctx).wljwt
    if (jwtCookie) {
      store.authStore.setToken(jwtCookie)
    } else {
      store.authStore.unsetToken()
    }
    // If the page to be opened has getInitialProps, run it and provide the page context
    let pageProps = {}
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }
    // Provide the snapshot of the just created store, so we can reuse it in the constructor
    // and it gets serialized and transported to the frontend
    return {
      initialStoreSnapshot: getSnapshot(store),
      pageProps,
    }
  }

  constructor(props: Props) {
    super(props)
    // Resurrect the store from its serialized snapshot out of getInitialProps.
    // We will use this from now on.
    this.store = initializeStore(props.initialStoreSnapshot)
  }

  public render() {
    return (
      <Provider store={this.store}>
        <AuthGate>
          <this.props.Component {...this.props.pageProps} />
        </AuthGate>
      </Provider>
    )
  }
}

export default CustomApp
