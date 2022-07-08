import { initEngine, ModularEngineConfig } from "modular-engine";

import { printDev } from "../../app/utils";
import { closeDrawer, openDrawer } from "../actions";

const initModularEngine = (config?: ModularEngineConfig) => {
  let engineConfig: ModularEngineConfig = {};

  let reduxConfig = engineConfig.redux || { customize: {} };

  let customize = reduxConfig.customize || {};

  reduxConfig.customize = {
    ...customize,
    ui: {
      state: {
        isDrawerOpen: false,
      },
      effects: {
        [closeDrawer.type]: (state, action) => ({
          ...state,
          isDrawerOpen: false,
        }),
        [openDrawer.type]: (state, action) => ({
          ...state,
          isDrawerOpen: true,
        }),
      },
    },
  };

  engineConfig.redux = reduxConfig;

  return import("modular-plugins").then(
    ({
      modalPlugin,
      uiPlugin,
      localizationPlugin,
      themerPlugin,
      routerPlugin,
      urlCheckerPlugin,
      epicsPlugin,
    }) => {
      let plugins = engineConfig.plugins || [];

      plugins = plugins.concat([
        modalPlugin,
        uiPlugin,
        localizationPlugin,
        themerPlugin,
        routerPlugin,
        urlCheckerPlugin,
        epicsPlugin,
      ]);

      engineConfig.plugins = plugins;

      const { store, config: output } = initEngine({ config: engineConfig });

      return {
        store,
        config: output,
      };
    }
  );
};

export default initModularEngine;
