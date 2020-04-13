import { observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { SignInPostRequestDto } from "../shared/dtos/signIn.post.request.dto";

interface IProps {
  signIn: (dto: SignInPostRequestDto) => any;
}

@observer
class SignInFormComponent extends React.Component<IProps> {
  @observable private dto: SignInPostRequestDto = new SignInPostRequestDto();
  @observable private signingIn = false;
  @observable private signInFailed = false;

  private onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      this.signingIn = true;
      this.signInFailed = false;
      await this.props.signIn(this.dto);
      this.signInFailed = false;
    } catch (error) {
      console.log(error);
      this.signInFailed = true;
    } finally {
      this.signingIn = false;
    }
  };

  public render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="email"
          placeholder="E-Mail"
          value={this.dto.username}
          onChange={(e) => (this.dto.username = e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={this.dto.password}
          onChange={(e) => (this.dto.password = e.target.value)}
        />
        <div className="form-buttons">
          <input
            type="submit"
            value={this.signingIn ? "Melde an…" : "Anmelden"}
          />
          {this.signInFailed && <div>Fehler bei der Anmeldung!</div>}
        </div>
      </form>
    );
  }
}

export default SignInFormComponent;
