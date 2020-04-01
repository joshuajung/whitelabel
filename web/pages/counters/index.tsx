import { inject, observer } from "mobx-react"
import React from "react"
import CounterComponent from "../../components/CounterComponent"
import { StoreInstance } from "../../store/RootStore"
import { CustomNextPageContext } from "../../interfaces/CustomNextPageContext"

interface Props {
  store?: StoreInstance
}

@inject("store")
@observer
class IndexPage extends React.Component<Props> {
  static async getInitialProps(ctx: CustomNextPageContext) {
    await ctx.store?.counterStore.fetchCounters()
    return {}
  }

  public render() {
    return (
      <div>
        <p>Counters:</p>
        <ul>
          {[...this.props.store?.counterStore.counters.values()].map(c => (
            <CounterComponent counter={c} key={c.id} />
          ))}
        </ul>
        <hr />
        <input value="Fetch All" onClick={() => this.props.store?.counterStore.fetchCounters()} type="button" />
        <input
          value="Fetch Single"
          onClick={() => this.props.store?.counterStore.fetchCounter("demoDtoSingle")}
          type="button"
        />
      </div>
    )
  }
}

export default IndexPage
