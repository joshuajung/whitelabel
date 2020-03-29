import * as React from "react"
import Axios from "axios"
import { observer, Observer } from "mobx-react"
import { observable, action, runInAction } from "mobx"
import { RootStoreContext } from "../store/RootStore"
import CounterComponent from "../components/CounterComponent"
import { withRouter } from "next/router"
import { WithRouterProps } from "next/dist/client/with-router"
import Head from "next/head"
import { Counter } from "../models/counter"
import { Optional } from "../types/Optional"
import { GetServerSideProps } from "next"

@observer
class CounterPage extends React.Component<{ htmlTitle?: string } & WithRouterProps> {
  static contextType = RootStoreContext
  declare context: React.ContextType<typeof RootStoreContext>

  componentDidMount() {
    if (this.props.router.query.id) {
      this.context.getCounter(this.counterId)
    }
  }

  private get counterId(): string {
    return this.props.router.query.id as string
  }

  private get counter(): Optional<Counter> {
    return this.context.counters.find(c => c.id === this.counterId)
  }

  public render() {
    return (
      <div>
        <Head>
          <title>Counter: {typeof window === "undefined" ? this.props.htmlTitle : this.counter?.name}</title>
        </Head>
        <h1>Detail Page for {this.props.router.query.id}</h1>
        <ul>{this.counter ? <CounterComponent counter={this.counter} /> : <p>Counter not found</p>}</ul>
      </div>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async context => {
  const result = await Axios.get("http://localhost:3000/" + context.params?.id)
  const dto = result.data
  const counter = new Counter(dto.id, dto.name, dto.currentTime)
  return { props: { htmlTitle: counter.name } }
}

export default withRouter(CounterPage)
