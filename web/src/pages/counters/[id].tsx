import * as React from "react";
import { inject, observer } from "mobx-react";
import CounterComponent from "../../components/CounterComponent";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";
import Head from "next/head";
import { ICustomNextPageContext } from "../../interfaces/CustomNextPageContext";
import { IRootStore } from "../../store/RootStore";
import HeaderComponent from "../../components/HeaderComponent";

interface IProps {
  store?: IRootStore;
}

@inject("store")
@observer
class CounterPage extends React.Component<IProps & WithRouterProps> {
  private get counterId(): string {
    return this.props.router.query.id as string;
  }

  private get counter() {
    return this.props.store!.counterStore.counters.get(this.counterId);
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
          isSignedIn={this.props.store!.authStore.isSignedIn}
          signOut={this.props.store!.authStore.unsetToken}
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
