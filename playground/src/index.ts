import "assets/styles/styles.output.css";

if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  navigator.serviceWorker
    .register("./serviceWorker.js", { scope: "/modular-creator/" })
    .then(
      function () {
        console.log("Service worker registration succeeded");
      },
      /*catch*/ function () {
        console.log("Service worker registration failed");
      }
    );
} else {
  console.log("Service workers are not supported.");
}

let engineConfig: Record<string, any> = {};

const engineParameters = import("engine.config").then(({ default: input }) => {
  return import("modular-creator-preview").then(({ initModularEngine }) => {
    engineConfig = input;
    const engineParams = initModularEngine(engineConfig);
    return engineParams;
  });
});

const creatorConfig = import("app.config").then(
  ({ default: config }) => config
);

const createApp = import("modular-creator-preview").then(
  ({ createModularApp }) => {
    return createModularApp;
  }
);

const renderFuntion = async () => {
  const ModularApp = (await createApp)({
    store: (await engineParameters).store,
    engineConfig: (await engineParameters).config,
    creatorConfig: await creatorConfig,
  });

  import("react-dom").then(({ render }) => {
    render(ModularApp(), document.getElementById("root"), () => {
      let Preloader = document.getElementById("preloader");
      if (Preloader) Preloader.style.visibility = "hidden";
    });
  });
};

renderFuntion();
