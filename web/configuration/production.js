// THIS SHOULD ADHERE TO src/interfaces/RuntimeConfig
const configuration = {
  // Server Runtime Config will only be available to the server, use e.g. to store secrets
  serverRuntimeConfig: {},
  // Server Runtime Config will be available to client and server
  publicRuntimeConfig: {
    phase: "PRODUCTION",
    apiUrl: process.env.API_URL,
  },
}

module.exports = configuration
