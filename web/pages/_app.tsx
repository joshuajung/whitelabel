import App, { AppProps } from "next/app"
import * as React from "react"
import { rootStore, RootStoreContext } from "../store/RootStore"
import HeaderComponent from "../components/HeaderComponent"

class MyApp extends React.Component<AppProps> {
  public render() {
    console.log("Rendering App")
    return (
      <RootStoreContext.Provider value={rootStore}>
        <HeaderComponent />
        <this.props.Component {...this.props.pageProps} />
      </RootStoreContext.Provider>
    )
  }

  public static getInitialProps = async appContext => {
    const appProps = await App.getInitialProps(appContext)
    return { ...appProps }
  }
}

export default MyApp
