import { observer } from "mobx-react";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import React from "react";
import NotAuthorizedComponent from "../components/NotAuthorizedComponent";
import { RootStoreContext } from "../store/RootStore";
import { Audience } from "./Audience";
import authorizations from "./authorizations";

interface IProps {
  children: React.ReactNode;
}

@observer
class AuthGate extends React.Component<WithRouterProps> {
  static contextType = RootStoreContext;
  public context!: React.ContextType<typeof RootStoreContext>;

  private get currentAudience(): Audience {
    if (this.context.authStore.sessionToken) {
      return Audience.SignedIn;
    } else {
      return Audience.Guest;
    }
  }

  private get allowedAudiences(): Audience[] {
    const route = this.props.router.route;
    return (
      authorizations.find((a) => a.route === route)?.allowedAudiences ?? []
    );
  }

  private get isAuthorized(): boolean {
    const allowed = this.allowedAudiences.includes(this.currentAudience);
    return allowed;
  }

  public render() {
    return (
      <div>
        {this.isAuthorized ? (
          this.props.children
        ) : (
          <NotAuthorizedComponent
            isSignedIn={this.context.authStore.isSignedIn ?? false}
            signIn={this.context.authStore.signIn ?? (() => null)}
          />
        )}
      </div>
    );
  }
}

export default withRouter(AuthGate);
