import React from "react"
import { observer } from "mobx-react"
import { SignInFormData, ISignInFormData } from "../store/models/SignInFormData"

interface IProps {
  signIn: (data: ISignInFormData) => any
}

@observer
class SignInFormComponent extends React.Component<IProps> {
  private data = SignInFormData.create()

  private onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.props.signIn(this.data)
  }

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
          <input type="submit" value="Anmelden" />
        </div>
      </form>
    )
  }
}

export default SignInFormComponent
