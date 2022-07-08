import React from "react";

import { ModularEngineStore } from "modular-engine-types";
import { History } from "history";

import { mount } from "enzyme";

import { defaultEngineConfig } from "../../../src/app/constants/default-configs";

import App from "../../../src/app/components/App";

const appConfig = {
  pagesRendering: () => React.lazy(() => import("../constants/TestComponent")),
  content: () => <div />,
  modals: { test: () => <div /> },
  preloader: () => (
    <div>
      <div className="preloader" />
    </div>
  ),
  header: () => <div />,
  footer: () => <div />,
  drawer: {
    content: () => <div />,
    logo: () => <div />,
  },
};

const MainAppTests = (store: ModularEngineStore, history: History) => {
  describe("\n     App\n", () => {
    test("with default config params", () => {
      const testProps = {
        store,
        history,
        config: {},
        engine: {},
      };
      const wrapper = mount(<App {...testProps} />);
      expect(wrapper);
    });

    test("with defined config params", () => {
      const testProps = {
        config: appConfig,
        engine: defaultEngineConfig.redux,
        store,
        history,
      };
      const wrapper = mount(<App {...testProps} />);
      expect(wrapper);
    });
  });
};

export default MainAppTests;
