import React from "react";

import { ModularEngineStore } from "modular-engine-types";
import initModularCreator from "../../src/api/core/init";
import { mount } from "enzyme";

const runTest = (store: ModularEngineStore) => {
  const appConfig = {
    core: { engineSync: (config) => config },
    content: () => <div />,
    error: () => <div />,
    modals: {},
    preloader: () => (
      <div>
        <div className="preloader" />
      </div>
    ),
    header: () => <div />,
    footer: () => <div />,
    plugins: [
      () => ({
        feature: "plugin1",
        field: () => ({
          name: "plugin1",
          content: {},
        }),
        format: (creatorConfig, enabledPlugins) => creatorConfig,
      }),
      () => ({
        component: () => <div />,
        internal: true,
      }),
      () => ({
        field: () => ({
          name: "plugin3",
        }),
        component: () => <div />,
        internal: false,
        format: (creatorConfig, enabledPlugins) => null,
      }),
    ],
  };

  describe("\n   initApplication\n", () => {
    test("init with empty config", () => {
      process.env.NODE_ENV === "development";
      mount(initModularCreator({}));

      mount(
        initModularCreator({
          store,
        })
      );

      mount(
        initModularCreator({
          store,
          creatorConfig: {},
        })
      );
    });
    test("init with defined config", () => {
      process.env.NODE_ENV === "development";
      mount(
        initModularCreator({
          store,
          creatorConfig: appConfig,
          engineConfig: {},
        })
      );
    });
  });
};

export default runTest;
