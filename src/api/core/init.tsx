import React from "react";
import { ModularEngineConfig, ModularEngineStore } from "modular-engine-types";

import {
  ModularCreatorConfig,
  ModularCreatorComponent,
} from "modular-creator-types";
import { formatConfig, parsePlugins } from "../helpers/init-helper";
import App from "../components/App";

/**
 * Init {@link https://github.com/CianciarusoCataldo/modular-creator modular-creator} system, and returns the already configured app,
 * that can be rendered
 *
 * @param {ModularEngineStore} store redux store, used to drive app components (enhanced with `modular-engine`)
 * @param {ModularCreatorConfig} creatorConfig app config, to determine which components will be rendered and where
 * @param {ModularEngineConfig} engine modular-engine output config (returned by initEngine function)
 *
 * @see https://cianciarusocataldo.github.io/modular-creator/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright 2022 Cataldo Cianciaruso
 */
const initModularCreator = (props?: {
  creatorConfig?: ModularCreatorConfig;
  engineConfig?: ModularEngineConfig;
  store?: ModularEngineStore;
}) => {
  let inputCreatorConfig: ModularCreatorConfig = {};
  let inputEngineConfig: ModularEngineConfig = {};
  let internalComponents: ModularCreatorComponent[] = [];
  let externalComponents: ModularCreatorComponent[] = [];
  let store: ModularEngineStore;

  if (props) {
    store = props.store;
    inputCreatorConfig = formatConfig(props.creatorConfig);
    inputEngineConfig = props.engineConfig || {};

    if (store) {
      const pluginsOutput = parsePlugins(
        inputCreatorConfig,
        props.engineConfig
      );

      externalComponents = pluginsOutput.externalComponents;
      internalComponents = pluginsOutput.internalComponents;
      inputCreatorConfig = pluginsOutput.creatorConfig;
    }
  }

  return {
    App: (
      <App
        store={store}
        creatorConfig={inputCreatorConfig}
        internalComponents={internalComponents}
        externalComponents={externalComponents}
      />
    ),
    config: inputCreatorConfig,
  };
};

export default initModularCreator;
