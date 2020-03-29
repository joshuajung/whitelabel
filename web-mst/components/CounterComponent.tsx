import React from "react"
import { inject, observer } from "mobx-react"
import { StoreInstance } from "../stores/store"

interface Props {
  store?: StoreInstance
}

@inject("store")
@observer
class CounterComponent extends React.Component<Props> {
  public render() {
    return (
      <div>
        Counter: {this.props.store?.foo}
        <input type="button" value="Count up" onClick={() => this.props.store?.countUp()} />
      </div>
    )
  }
}

export default CounterComponent
