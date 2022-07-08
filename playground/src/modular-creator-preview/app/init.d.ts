/// <reference types="react" />
import { ModularEngineConfig, ModularEngineStore } from "modular-engine";
import { AppConfig } from "./types";
export declare const createModularApp: ({ creatorConfig, engineConfig, store, }: {
    creatorConfig: AppConfig;
    engineConfig: ModularEngineConfig;
    store: ModularEngineStore;
}) => () => JSX.Element;
