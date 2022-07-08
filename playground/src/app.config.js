import { lazy } from "react";

import drawer from "contents/drawer";
import footer from "contents/footer";
import header from "contents/header";
import modals from "contents/modals";
import preloader from "contents/preloader";

const appConfig = {
  pagesRendering: (routeKey) => lazy(() => import(`pages/${routeKey}`)),
  modals,
  preloader,
  header,
  footer,
  drawer,
  modalsNamespace: "modal-titles",
};

export default appConfig;
