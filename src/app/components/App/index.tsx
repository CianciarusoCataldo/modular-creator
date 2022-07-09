import React from "react";

import { AppConfig } from "../../types";

import { ModularEngineConfig, ModularEngineStore } from "modular-engine";

import AppModal from "../AppModal";
import AppRouter from "../AppRouter";
import ErrorBoundary from "../AppErrorBoundary";
import AppDrawer from "../AppDrawer";

import { driveWithDarkMode } from "../../utils";
import { Container } from "modular-ui-components";
import { Provider } from "react-redux";

/**
 * Modular main app, rendered at the end of the init process.
 *
 * @param {ModularEngineStore} store redux store, used to drive app components (enhanced with `modular-engine`)
 * @param {AppConfig} config app config, to determine which components will be rendered and where
 * @param {ModularEngineConfig} engine app engine config, the same config file passed to modular-engine initStore function
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright 2022 Cataldo Cianciaruso
 */
const MainApp = ({
  store,
  config,
  engineConfig,
}: {
  store?: ModularEngineStore;
  config?: AppConfig;
  engineConfig?: ModularEngineConfig;
}) => {
  if (store && config && engineConfig) {
    const CustomContent = config.content;
    const HeaderContent = config.header;
    const FooterContent = config.footer;
    const DrawerContent = config.drawer && config.drawer.content;
    const Preloader = config.preloader;

    const drawerProps = config.drawer
      ? {
          children: config.drawer.content,
          position: config.drawer.position,
        }
      : {};
    const AppContainer = driveWithDarkMode(Container);

    return (
      <React.Suspense fallback={Preloader ? <Preloader /> : <div />}>
        <Provider store={store}>
          <ErrorBoundary fallback={config.error}>
            {config.modals && (
              <AppModal
                store={store}
                namespace={config.modalNamepsace}
                modals={config.modals}
              />
            )}
            {DrawerContent && (
              <AppDrawer {...drawerProps}>
                {DrawerContent && <DrawerContent />}
              </AppDrawer>
            )}
            <div
              id="app-container"
              style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {HeaderContent && (
                <header
                  style={{
                    position: "relative",
                    top: "0",
                    right: "0",
                    left: "0",
                    width: "100%",
                  }}
                >
                  <AppContainer>
                    <HeaderContent />
                  </AppContainer>
                </header>
              )}
              <AppRouter
                renderCallback={
                  config.pagesRendering || ((route) => () => <div />)
                }
                history={engineConfig.history}
              />
              {CustomContent && <CustomContent />}
              {FooterContent && (
                <footer
                  style={{
                    width: "100%",
                    position: "relative",
                    bottom: 0,
                    left: "0",
                    right: "0",
                  }}
                >
                  <AppContainer>
                    <FooterContent />
                  </AppContainer>
                </footer>
              )}
            </div>
          </ErrorBoundary>
        </Provider>
      </React.Suspense>
    );
  } else {
    return <div />;
  }
};

export default MainApp;
