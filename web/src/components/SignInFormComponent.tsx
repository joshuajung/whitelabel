import React from "react";
import { observer } from "mobx-react";
import {
  SignInFormData,
  ISignInFormData,
} from "../store/models/SignInFormData";

interface IProps {
  signIn: (data: ISignInFormData) => any;
}

@observer
class SignInFormComponent extends React.Component<IProps> {
  private data = SignInFormData.create();

  private onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      this.data.setSigningIn(true);
      this.data.setSignInFailed(false);
      await this.props.signIn(this.data);
      this.data.setSignInFailed(false);
    } catch (error) {
      console.log(error);
      this.data.setSignInFailed(true);
    } finally {
      this.data.setSigningIn(false);
    }
  };

  public render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="email"
          placeholder="E-Mail"
          value={this.data.email}
          onChange={(e) => this.data.setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={this.data.password}
          onChange={(e) => this.data.setPassword(e.target.value)}
        />
        <div className="form-buttons">
          <input
            type="submit"
            value={this.data.signingIn ? "Melde an…" : "Anmelden"}
          />
          {this.data.signInFailed && <div>Fehler bei der Anmeldung!</div>}
        </div>
      </form>
    );
  }
}

export default SignInFormComponent;
