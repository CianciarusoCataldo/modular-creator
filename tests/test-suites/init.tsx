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
        format: () => null,
      }),
    ],
  };

  describe("\n   initApplication\n", () => {
    test("init without parameters", () => {
      process.env.NODE_ENV === "development";
      mount(initModularCreator().App);
    });

    test("init without any config", () => {
      process.env.NODE_ENV === "development";

      mount(
        initModularCreator({
          store,
        }).App
      );
    });

    test("init without a store", () => {
      process.env.NODE_ENV === "development";
      mount(
        initModularCreator({
          creatorConfig: {
            preloader: () => <div />,
            header: () => <div />,
            footer: () => <div />,
            content: () => <div />,
            error: () => <div />,
          },
        }).App
      );

      mount(
        initModularCreator({
          creatorConfig: {
            header: () => <div />,
            footer: () => <div />,
            content: () => <div />,
            error: () => <div />,
          },
        }).App
      );
    });

    test("init with an empty config", () => {
      process.env.NODE_ENV === "development";

      mount(
        initModularCreator({
          store,
          creatorConfig: {},
        }).App
      );
    });
    test("init with defined config", () => {
      process.env.NODE_ENV === "development";

      mount(
        initModularCreator({
          store,
          creatorConfig: appConfig,
          engineConfig: {},
        }).App
      );
    });
  });
};

export default runTest;
