import { initEngine, ModularEngineConfig } from "modular-engine";

import { closeDrawer, openDrawer } from "../actions";

const initModularEngine = (config?: ModularEngineConfig) => {
  let engineConfig: ModularEngineConfig = config || {};

  const reduxConfig = engineConfig.redux || { customize: {} };

  let customize = reduxConfig.customize || {};

  const addons = {
    ui: {
      state: {
        isDrawerOpen: false,
      },
      effects: {
        [closeDrawer.type]: (state, action) => ({
          ...state,
          isDrawerOpen:false
        }),
        [openDrawer.type]: (state, action) => ({
          ...state,
          isDrawerOpen: true,
        }),
      },
    },
  };

  Object.keys(addons).forEach((addon) => {
    if (customize[addon]) {
      const customState = customize[addon].state || {};
      const customEffects = customize[addon].effects || {};

      customize[addon].state = { ...customState, ...addons[addon].state };
      customize[addon].effects = { ...customEffects, ...addons[addon].effects };
    } else {
      customize[addon] = addons[addon];
    }
  });

  reduxConfig.customize = customize;

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
