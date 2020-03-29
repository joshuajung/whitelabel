import React from "react"
import { observer } from "mobx-react"
import Link from "next/link"

interface Props {
  counter: any
}

@observer
class CounterComponent extends React.Component<Props> {
  public render() {
    return (
      <li>
        <Link href="/[id]" as={`${this.props.counter.id}`}>
          <a>
            {this.props.counter.name}: {this.props.counter.value}
          </a>
        </Link>{" "}
        <input type="button" value="Count up" onClick={() => this.props.counter.countUp()} />
      </li>
    )
  }
}

export default CounterComponent
