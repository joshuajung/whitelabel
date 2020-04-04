import React from "react"
import { inject, observer } from "mobx-react"
import { IRootStore } from "../store/RootStore"
import { withRouter } from "next/router"
import { WithRouterProps } from "next/dist/client/with-router"
import { Audience } from "./Audience"
import authorizations from "./authorizations"
import NotAuthorizedComponent from "../components/NotAuthorizedComponent"

interface IProps {
  children: React.ReactNode
  store?: IRootStore
}

@inject("store")
@observer
class AuthGate extends React.Component<IProps & WithRouterProps> {
  private get currentAudience(): Audience {
    if (this.props.store?.authStore.sessionToken) {
      return Audience.SignedIn
    } else {
      return Audience.Guest
    }
  }

  private get allowedAudiences(): Audience[] {
    const route = this.props.router.route
    return authorizations.find((a) => a.route === route)?.allowedAudiences ?? []
  }

  private get isAuthorized(): boolean {
    const allowed = this.allowedAudiences.includes(this.currentAudience)
    return allowed
  }

  public render() {
    return (
      <div>
        {this.isAuthorized ? (
          this.props.children
        ) : (
          <NotAuthorizedComponent
            isSignedIn={this.props.store?.authStore.isSignedIn ?? false}
            signIn={this.props.store?.authStore.signIn ?? ((d) => null)}
          />
        )}
      </div>
    )
  }
}

export default withRouter(AuthGate)
