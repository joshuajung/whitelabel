import React from "react"
import { SampleComponent } from "../components/SampleComponent"
import CounterComponent from "../components/CounterComponent"

class OtherPage extends React.Component {
  public render() {
    return (
      <div>
        <SampleComponent title={"Other Page"} linkTo="/" />
        <CounterComponent />
      </div>
    )
  }
}

export default OtherPage
