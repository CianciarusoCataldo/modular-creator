import { createModularAction } from "modular-utils";

/**
 * Open modular-engine drawer
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const openDrawer = createModularAction("@@ui/OPEN_DRAWER");

/**
 * Close modular-engine drawer
 *
 */
export const closeDrawer = createModularAction("@@ui/CLOSE_DRAWER");
