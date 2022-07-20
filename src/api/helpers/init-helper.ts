import { ModularEngineConfig } from "modular-engine-types";

import {
  Formatter,
  ModularCreatorComponent,
  ModularCreatorConfig,
} from "modular-creator-types";

export const formatConfig = (
  config?: ModularCreatorConfig
): ModularCreatorConfig => {
  let creatorConfig = config || {};
  return {
    ...creatorConfig,
    core: creatorConfig.core || {},
    plugins: creatorConfig.plugins || [],
  };
};

export const parsePlugins = (
  creatorConfig: ModularCreatorConfig,
  engineConfig: ModularEngineConfig
) => {
  let creator = formatConfig(creatorConfig);

  let plugins = creator.plugins;
  let enabledPlugins: string[] = [];
  let externalComponents: ModularCreatorComponent[] = [];
  let internalComponents: ModularCreatorComponent[] = [];

  let formatters: Formatter[] = [];

  plugins.forEach((plugin) => {
    const pluginOutput = plugin();

    if (pluginOutput.feature) {
      enabledPlugins.push(pluginOutput.feature);
    }

    if (pluginOutput.field) {
      const field = pluginOutput.field(creator);

      if (field && field.name) {
        creator[field.name] = field.content || {};
      }
    }

    if (pluginOutput.component) {
      if (pluginOutput.internal) {
        internalComponents.push(pluginOutput.component);
      } else {
        externalComponents.push(pluginOutput.component);
      }
    }

    pluginOutput.format && formatters.push(pluginOutput.format);
  });

  if (creator.core.engineSync) {
    creator = creator.core.engineSync(creator, engineConfig, enabledPlugins);
  }

  formatters.forEach((formatter) => {
    creator = formatter(creator, enabledPlugins) || creator;
  });

  return {
    externalComponents,
    internalComponents,
    engineConfig,
    creatorConfig: creator,
  };
};
