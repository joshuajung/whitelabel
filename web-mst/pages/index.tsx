import React from "react"
import { SampleComponent } from "../components/SampleComponent"
import CounterComponent from "../components/CounterComponent"

class IndexPage extends React.Component {
  public render() {
    return (
      <div>
        <SampleComponent title={"Index Page"} linkTo="/other" />
        <CounterComponent />
      </div>
    )
  }
}

export default IndexPage
