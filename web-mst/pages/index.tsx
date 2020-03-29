import React from "react"
import { inject, observer } from "mobx-react"
import { StoreInstance } from "../stores/store"
import CounterComponent from "../components/CounterComponent"
import { MyNextPageContext } from "./_app"

interface Props {
  store?: StoreInstance
}

@inject("store")
@observer
class IndexPage extends React.Component<Props> {
  static async getInitialProps(ctx: MyNextPageContext) {
    await ctx.store?.fetchCounters()
    return {}
  }

  public render() {
    return (
      <div>
        <p>Counters:</p>
        <ul>
          {[...this.props.store?.counters.values()].map(c => (
            <CounterComponent counter={c} key={c.id} />
          ))}
        </ul>
        <hr />
        <input value="Fetch All" onClick={() => this.props.store?.fetchCounters()} type="button" />
        <input value="Fetch Single" onClick={() => this.props.store?.fetchCounter("demoDtoSingle")} type="button" />
      </div>
    )
  }
}

export default IndexPage
