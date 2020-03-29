import * as React from "react"
import Axios from "axios"
import { observer, Observer } from "mobx-react"
import { observable, action, runInAction } from "mobx"
import { RootStoreContext } from "../store/RootStore"
import CounterComponent from "../components/CounterComponent"

@observer
class IndexPage extends React.Component {
  static contextType = RootStoreContext
  declare context: React.ContextType<typeof RootStoreContext>

  componentDidMount() {
    this.context.getCounter("demoDtoObject")
  }

  public render() {
    return (
      <div>
        <p>Counters:</p>
        <ul>
          {this.context.counters.map(c => (
            <CounterComponent counter={c} key={c.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default IndexPage
