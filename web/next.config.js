const withFonts = require("next-fonts");
const developmentConfiguration = require("./configuration/development");
const productionConfiguration = require("./configuration/production");
const {
  PHASE_PRODUCTION_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_DEVELOPMENT_SERVER,
} = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  console.log("Providing Configuration for phase", phase);
  let configuration = {};

  // Loads phase-specific configuration
  switch (phase) {
    case PHASE_DEVELOPMENT_SERVER:
      configuration = { ...configuration, ...developmentConfiguration };
      break;
    case PHASE_PRODUCTION_BUILD:
    case PHASE_PRODUCTION_SERVER:
      configuration = { ...configuration, ...productionConfiguration };
      break;
  }

  // Add support for webfonts
  configuration = withFonts(configuration);

  // This is needed to support symlinked shared DTOs
  configuration.webpack = (config) => {
    return { ...config, resolve: { ...config.resolve, symlinks: false } };
  };

  return configuration;
};
