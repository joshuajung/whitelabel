import { inject, observer } from "mobx-react";
import React from "react";
import CounterComponent from "../../components/CounterComponent";
import { IRootStore } from "../../store/RootStore";
import { ICustomNextPageContext } from "../../interfaces/CustomNextPageContext";

interface IProps {
  store?: IRootStore;
}

@inject("store")
@observer
class IndexPage extends React.Component<IProps> {
  static async getInitialProps(ctx: ICustomNextPageContext) {
    await ctx.store?.counterStore.fetchCounters();
    return {};
  }

  public render() {
    return (
      <div>
        <p>Counters:</p>
        <ul>
          {[...this.props.store?.counterStore.counters.values()].map((c) => (
            <CounterComponent counter={c} key={c.id} />
          ))}
        </ul>
        <hr />
        <input
          value="Fetch All"
          onClick={() => this.props.store?.counterStore.fetchCounters()}
          type="button"
        />
        <input
          value="Fetch Single"
          onClick={() =>
            this.props.store?.counterStore.fetchCounter("demoDtoSingle")
          }
          type="button"
        />
      </div>
    );
  }
}

export default IndexPage;
