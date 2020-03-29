import * as React from "react"
import { StoreInstance } from "../stores/store"
import { inject, observer } from "mobx-react"
import { WithRouterProps } from "next/dist/client/with-router"
import CounterComponent from "../components/CounterComponent"
import { withRouter } from "next/dist/client/router"

interface Props {
  store?: StoreInstance
}

@inject("store")
@observer
class CounterPage extends React.Component<Props & WithRouterProps> {
  private get counterId(): string {
    return this.props.router.query.id as string
  }

  private get counter() {
    return this.props.store?.counters.get(this.counterId)
  }

  public render() {
    return (
      <div>
        {/* <Head>
          <title>Counter: {typeof window === "undefined" ? this.props.htmlTitle : this.counter?.name}</title>
        </Head> */}
        <h1>Detail Page for {this.props.router.query.id}</h1>
        <ul>{this.counter ? <CounterComponent counter={this.counter} /> : <p>Counter not found</p>}</ul>
      </div>
    )
  }
}

// export const getServerSideProps: GetServerSideProps = async context => {
//   const result = await Axios.get("http://localhost:3000/" + context.params?.id)
//   const dto = result.data
//   const counter = new Counter(dto.id, dto.name, dto.currentTime)
//   return { props: { htmlTitle: counter.name } }
// }

export default withRouter(CounterPage)
