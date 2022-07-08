/// <reference types="react" />
export declare const printDev: (output: any) => void;
/**
 * Enhance the element with the dark-mode parameter, from global state
 *
 * @param Element component to drive with the dark mode
 * @returns the same component, enhanced with dark mode parameter
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
export declare const driveWithDarkMode: (Element: (props: any) => JSX.Element) => (args: any) => JSX.Element;
