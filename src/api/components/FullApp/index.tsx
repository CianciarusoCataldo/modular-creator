import { ModularCreatorComponent } from "modular-creator-types";
import React from "react";

import { Provider } from "react-redux";
import BasicApp from "../BasicApp";

/** {@link https://github.com/CianciarusoCataldo/modular-creator modular-creator} full app, rendered when a validstore is provided
 *
 * @see https://cianciarusocataldo.github.io/modular-creator/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright 2022 Cataldo Cianciaruso
 */
const FullApp: ModularCreatorComponent<
  {},
  {
    internalComponents: ModularCreatorComponent[];
    externalComponents: ModularCreatorComponent[];
  }
> = ({ creatorConfig, store, externalComponents, internalComponents }) => {
  return (
    <Provider store={store!}>
      {externalComponents.map((ExternalComponent, key) => (
        <div key={`plugin_${key}`}>
          <ExternalComponent creatorConfig={creatorConfig} store={store} />
        </div>
      ))}
      <BasicApp creatorConfig={creatorConfig}>
        <div style={{ height: "100%", overflow: "auto", width: "100%" }}>
          {internalComponents.map((InternalComponent, key) => (
            <div key={`plugin_${key}`}>
              <InternalComponent creatorConfig={creatorConfig} store={store} />
            </div>
          ))}
        </div>
      </BasicApp>
    </Provider>
  );
};

export default FullApp;
