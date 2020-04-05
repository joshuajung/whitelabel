import React from "react";
import { observer } from "mobx-react";
import Link from "next/link";
import { Instance } from "mobx-state-tree";
import { Counter } from "../store/models/Counter";

interface IProps {
  counter: Instance<typeof Counter>;
}

@observer
class CounterComponent extends React.Component<IProps> {
  public render() {
    return (
      <li>
        <Link href="/counters/[id]" as={`/counters/${this.props.counter.id}`}>
          <a>
            {this.props.counter.name}: {this.props.counter.value}
          </a>
        </Link>{" "}
        <input
          type="button"
          value="Count up"
          onClick={() => this.props.counter.countUpBy(1)}
        />
      </li>
    );
  }
}

export default CounterComponent;
