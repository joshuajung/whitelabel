import React from "react";
import SignInFormComponent from "./SignInFormComponent";
import { SignInPostRequestDto } from "../shared/dtos/signIn.post.request.dto";

interface IProps {
  isSignedIn: boolean;
  signIn: (data: SignInPostRequestDto) => any;
}

class NotAuthorizedComponent extends React.Component<IProps> {
  public render() {
    return this.props.isSignedIn ? (
      <div>You are signed in, but not authorized to view this page.</div>
    ) : (
      <SignInFormComponent signIn={this.props.signIn} />
    );
  }
}

export default NotAuthorizedComponent;
