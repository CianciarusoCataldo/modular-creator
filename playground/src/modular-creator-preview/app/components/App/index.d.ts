/// <reference types="react" />
import { AppConfig } from "../../types";
import { ModularEngineConfig, ModularEngineStore } from "modular-engine";
/**
 * Modular main app, rendered at the end of the init process.
 *
 * @param {Store} store redux store, used to drive app components (enhanced with `modular-engine`)
 * @param {History} history history object, used for routing logic
 * @param {AppConfig} config app config, to determine which components will be rendered and where
 * @param {{ ui?: boolean; modal?: boolean }} engine app engine config, the same config file passed to modular-engine initStore function
 * @param {Theme} theme app custom theme, to customize some UI parts
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright 2022 Cataldo Cianciaruso
 */
declare const MainApp: ({ store, config, engineConfig, }: {
    store?: ModularEngineStore;
    config?: AppConfig;
    engineConfig?: ModularEngineConfig;
}) => JSX.Element;
export default MainApp;
