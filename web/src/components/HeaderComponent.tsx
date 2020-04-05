import { observer } from "mobx-react";
import React from "react";

interface IProps {
  isSignedIn: boolean;
  signOut: () => any;
}

@observer
class HeaderComponent extends React.Component<IProps> {
  public render() {
    return (
      <div>
        {this.props.isSignedIn ? (
          <div>
            <div>Signed in</div>
            <input
              type="button"
              value="Sign out"
              onClick={this.props.signOut}
            />
          </div>
        ) : (
          <div>Signed out</div>
        )}
      </div>
    );
  }
}

export default HeaderComponent;
