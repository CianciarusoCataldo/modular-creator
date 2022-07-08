import { ModularEngineConfig, ModularEngineStore } from "modular-engine";
import MainApp from "./components/App";
import { AppConfig } from "./types";

export const createModularApp = ({
  creatorConfig,
  engineConfig,
  store,
}: {
  creatorConfig: AppConfig;
  engineConfig: ModularEngineConfig;
  store: ModularEngineStore;
}) => {
  return () =>
    MainApp({
      engineConfig,
      config: creatorConfig,
      store,
    });
};
