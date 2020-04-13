import { observer } from "mobx-react";
import React from "react";
import CounterComponent from "../../components/CounterComponent";
import HeaderComponent from "../../components/HeaderComponent";
import { ICustomNextPageContext } from "../../interfaces/CustomNextPageContext";
import { RootStoreContext } from "../../store/RootStore";

@observer
class IndexPage extends React.Component {
  static async getInitialProps(ctx: ICustomNextPageContext) {
    await ctx.store?.counterStore.fetchCounters(ctx.store);
    return {};
  }

  static contextType = RootStoreContext;
  public context!: React.ContextType<typeof RootStoreContext>;

  public render() {
    return (
      <div>
        <HeaderComponent
          isSignedIn={this.context.authStore.isSignedIn}
          signOut={this.context.authStore.unsetToken}
        />
        <p>Counters:</p>
        <ul>
          {this.context.counterStore.counters.map((c) => (
            <CounterComponent counter={c} key={c.id} />
          ))}
        </ul>
        <hr />
        <input
          value="Fetch All"
          onClick={() => this.context.counterStore.fetchCounters(this.context)}
          type="button"
        />
        <input
          value="Fetch Single"
          onClick={() =>
            this.context.counterStore.fetchCounter(
              this.context,
              "demoDtoSingle"
            )
          }
          type="button"
        />
      </div>
    );
  }
}

export default IndexPage;
