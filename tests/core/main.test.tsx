import { initEngine } from "modular-engine";
import PKG from "../../package.json";

import initApplicationTest from "../test-suites/init";

//Tests
import AppModalTest from "../test-suites/components/AppModal";
import AppDrawerTest from "../test-suites/components/AppDrawer";
import MainAppTests from "../test-suites/components/MainApp";
import AppErrorBoundaryTest from "../test-suites/components/AppErrorBoundary";
import {
  modalPlugin,
  routerPlugin,
  themerPlugin,
  uiPlugin,
  urlCheckerPlugin,
} from "modular-plugins";
import { createBrowserHistory } from "history";

describe(`\n                       ## Modular - v.${PKG.version} - Unit tests ##`, () => {
  initApplicationTest();
  describe("\n   Components", () => {
    const { config, store } = initEngine({
      config: {
        router: {
          routes: {
            homePge: "home",
            basename: "/testing-app",
            home: "/",
            test: "/test",
          },
        },
        plugins: [
          uiPlugin,
          routerPlugin,
          themerPlugin,
          modalPlugin,
          urlCheckerPlugin,
        ],
      },
    });

    MainAppTests(store, config.history || createBrowserHistory());
    AppModalTest(store);
    AppDrawerTest(store);
    AppErrorBoundaryTest();
  });
});
