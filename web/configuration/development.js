// THIS SHOULD ADHERE TO src/interfaces/RuntimeConfig
const configuration = {
  // Server Runtime Config will only be available to the server, use e.g. to store secrets
  serverRuntimeConfig: {
    secret: "THISISASECRET",
  },
  // Server Runtime Config will be available to client and server
  publicRuntimeConfig: {
    phase: "DEVELOPMENT",
    apiUrl: "http://localhost:3000",
  },
}

module.exports = configuration
