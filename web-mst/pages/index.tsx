import React from "react"
import { inject, observer } from "mobx-react"
import { StoreInstance } from "../stores/store"
import { values } from "mobx"
import CounterComponent from "../components/CounterComponent"

interface Props {
  store?: StoreInstance
}

@inject("store")
@observer
class IndexPage extends React.Component<Props> {
  public render() {
    return (
      <div>
        <p>Counters:</p>
        <ul>
          {values(this.props.store?.counters).map(c => (
            <CounterComponent counter={c} key={c.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default IndexPage
