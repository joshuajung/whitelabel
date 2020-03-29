import React from "react"
import { RootStoreContext } from "../store/RootStore"
import { observer } from "mobx-react"
import CounterComponent from "./CounterComponent"
import Link from "next/link"

@observer
class HeaderComponent extends React.Component {
  static contextType = RootStoreContext
  declare context: React.ContextType<typeof RootStoreContext>

  public render() {
    return (
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <p>Counters in Header:</p>
        <ul>
          {this.context.counters.map(c => (
            <CounterComponent counter={c} key={c.id} />
          ))}
        </ul>
        <hr />
      </div>
    )
  }
}

export default HeaderComponent
