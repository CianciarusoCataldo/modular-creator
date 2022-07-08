import React from "react";

import { mount } from "enzyme";

import { initApplication } from "../../src";
import { defaultEngineConfig } from "../../src/app/constants/default-configs";

const runTest = () => {
  const appConfig = {
    content: () => <div />,
    modals: {},
    preloader: () => (
      <div>
        <div className="preloader" />
      </div>
    ),
    header: () => <div />,
    footer: () => <div />,
  };

  describe("\n   initApplication\n", () => {
    test("init with default config", () => {
      process.env.NODE_ENV === "development";

      initApplication({
        onComplete: (App) => {
          const wrapper = mount(<App />);
          expect(wrapper);
        },
      });
    });

    test("init with given config", () => {
      process.env.NODE_ENV === "test";

      initApplication({
        engine: { redux: defaultEngineConfig.redux },
        appConfig: appConfig,
        onComplete: (App) => {
          const wrapper = mount(<App />);
          expect(wrapper);
        },
      });
    });

    test("onStart callback is called at the start of the init process", () => {
      const onStartStub = jest.fn();
      initApplication({
        engine: { redux: { ...defaultEngineConfig.redux } },
        appConfig: {
          ...appConfig,
          drawer: {
            content: () => <div />,
            position: undefined,
          },
        },
        onStart: () => onStartStub(),
        onComplete: (App) => {
          mount(<App />);
          expect(onStartStub).toBeCalled;
        },
      });
    });
  });
};

export default runTest;
