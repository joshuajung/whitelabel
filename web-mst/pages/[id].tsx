import * as React from "react"
import { StoreInstance } from "../stores/store"
import { inject, observer } from "mobx-react"
import CounterComponent from "../components/CounterComponent"
import { withRouter } from "next/router"
import { WithRouterProps } from "next/dist/client/with-router"
import { MyNextPageContext } from "./_app"
import Head from "next/head"

interface Props {
  store?: StoreInstance
}

@inject("store")
@observer
class CounterPage extends React.Component<Props & WithRouterProps> {
  private get counterId(): string {
    return this.props.router.query.id as string
  }

  private get counter() {
    return this.props.store?.counters.get(this.counterId)
  }

  static async getInitialProps(ctx: MyNextPageContext) {
    await ctx.store?.fetchCounter(ctx.query["id"] as string)
    return {}
  }

  public render() {
    return (
      <div>
        <Head>
          <title>Counter: {this.counter?.name}</title>
        </Head>
        <h1>Detail Page for {this.props.router?.query.id}</h1>
        <ul>{this.counter ? <CounterComponent counter={this.counter} /> : <p>Counter not found</p>}</ul>
      </div>
    )
  }
}

export default withRouter(CounterPage)
