import { types } from "mobx-state-tree"

export const AuthStore = types.model({ sessionToken: types.maybe(types.string) }).actions(self => ({
  setToken: (token: string) => {
    self.sessionToken = token
  },
  unsetToken: () => {
    self.sessionToken = undefined
  }
}))
