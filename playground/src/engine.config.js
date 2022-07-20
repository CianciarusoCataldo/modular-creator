import { closeDrawer, openDrawer } from "./app/actions";
import plugins from "./engine-plugins";

const engineConfig = {
  appName: "Modular-creator",
  debug: false,
  plugins,
  redux: {
    customize: {
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
    },
  },
  router: {
    basename: "/modular-creator",
    homePage: "HomePage",
    routes: {
      HomePage: "/",
    },
  },
  localization: {
    fallbackLanguage: "en",
    supportedLanguages: ["en", "it", "es", "fr", "de"],
    namespaces: ["common", "homepage"],
    defaultNamespace: "common",
    loadPath: "/modular-creator/locales/{{lng}}/{{ns}}.json",
    titlesNamespace: "pages",
  },
  ui: {
    darkMode: true,
  },
  theme: {
    default: {
      bodyColor:
        "linear-gradient(0deg, rgba(246,225,203,1) 29%, rgba(219,232,235,1) 100%)",
      uiColor:
        "linear-gradient(317deg, rgb(251, 251, 251) 0%, rgb(238, 238, 238) 71%, rgb(246, 246, 246) 100%);",
    },
    dark: {
      uiColor:
        "linear-gradient(108deg, rgba(74,59,53,1) 0%, rgba(33,35,61,1) 48%, rgba(12,17,18,1) 100%)",
      bodyColor: "linear-gradient(rgba(50,51,71,1) 48%, rgba(12,17,18,1) 100%)",
    },
  },
};

export default engineConfig;
