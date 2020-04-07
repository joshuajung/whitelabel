import { observer } from "mobx-react";
import { WithRouterProps } from "next/dist/client/with-router";
import Head from "next/head";
import { withRouter } from "next/router";
import * as React from "react";
import CounterComponent from "../../components/CounterComponent";
import HeaderComponent from "../../components/HeaderComponent";
import { ICustomNextPageContext } from "../../interfaces/CustomNextPageContext";
import { RootStoreContext } from "../../store/RootStore";

@observer
class CounterPage extends React.Component<WithRouterProps> {
  static contextType = RootStoreContext;
  public context!: React.ContextType<typeof RootStoreContext>;

  private get counterId(): string {
    return this.props.router.query.id as string;
  }

  private get counter() {
    return this.context.counterStore.counters.get(this.counterId);
  }

  static async getInitialProps(ctx: ICustomNextPageContext) {
    await ctx.store!.counterStore.fetchCounter(ctx.query["id"] as string);
    return {};
  }

  public render() {
    return (
      <div>
        <Head>
          <title>Counter: {this.counter?.name}</title>
        </Head>
        <HeaderComponent
          isSignedIn={this.context.authStore.isSignedIn}
          signOut={this.context.authStore.unsetToken}
        />
        <h1>Detail Page for {this.props.router?.query.id}</h1>
        <ul>
          {this.counter ? (
            <CounterComponent counter={this.counter} />
          ) : (
            <p>Counter not found</p>
          )}
        </ul>
      </div>
    );
  }
}

export default withRouter(CounterPage);
