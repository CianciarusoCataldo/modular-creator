import { createModularSelector } from "modular-utils";

import { getUIView } from "modular-plugins";

/**
 * Returns modular-engine drawer visibility
 *
 * @see https://github.com/CianciarusoCataldo/modular-engine/#ui
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const isDrawerOpen = createModularSelector(
  getUIView,
  ({ isDrawerOpen }) => isDrawerOpen
);
