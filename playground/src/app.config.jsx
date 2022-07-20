import React from "react";

import drawerPlugin from "api/plugins/drawer";
import formsPlugin from "api/plugins/forms";
import pagesPlugin from "api/plugins/pages";

import { DrawerContent } from "contents/drawer";
import footer from "contents/footer";
import header from "contents/header";
import modals from "contents/modals";
import { syncConfigWithEngine } from "api/helpers/engine-connector";

const appConfig = {
  core: {
    engineSync: syncConfigWithEngine,
  },
  plugins: [drawerPlugin, pagesPlugin, formsPlugin],
  preloader: () => <div className="preloader" />,
  pages: {
    render: (route) => React.lazy(() => import(`app/pages/${route}`)),
  },
  forms: {
    modals,
  },
  header,
  footer,
  drawer: {
    content: DrawerContent,
  },
};

export default appConfig;
