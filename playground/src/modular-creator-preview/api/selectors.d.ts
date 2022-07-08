/**
 * Returns modular-engine drawer visibility
 *
 * @see https://github.com/CianciarusoCataldo/modular-engine/#ui
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export declare const isDrawerOpen: ((state: {
    [x: string]: any;
    config?: import("modular-engine-types").ModularEngineConfigState<{}>;
}) => any) & import("reselect").OutputSelectorFields<(args_0: import("modular-plugin-ui/dist/plugin/types").UIState) => any> & {
    clearCache: () => void;
};
