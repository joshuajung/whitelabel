export interface RuntimeConfig {
  serverRuntimeConfig?: {
    secret: string
  }
  // Server Runtime Config will be available to client and server
  publicRuntimeConfig: {
    phase: "DEVELOPMENT" | "PRODUCTION"
    apiUrl: string
  }
}
