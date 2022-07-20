import { PageRouterPlugin } from "./types";

import AppRouter from "./component";
import { createBrowserHistory } from "history";

const pageRouterPlugin: PageRouterPlugin = () => ({
  feature: "pages",
  internal: true,
  component: AppRouter,
  field: (creator) => {
    let pagesConfig = creator.pages || {};

    return {
      name: "pages",
      content: {
        render: pagesConfig.render,
        routes: pagesConfig.routes || {},
        homePage: pagesConfig.homePage || "",
        history: pagesConfig.history || createBrowserHistory(),
      },
    };
  },
});

export default pageRouterPlugin;
