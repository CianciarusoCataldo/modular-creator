import { ModularCreatorComponent } from "modular-creator-types";

import React from "react";

import ErrorBoundary from "../AppErrorBoundary";
import BasicApp from "../BasicApp";
import FullApp from "../FullApp";

const App: ModularCreatorComponent<
  {},
  {
    internalComponents: ModularCreatorComponent[];
    externalComponents: ModularCreatorComponent[];
  }
> = ({ creatorConfig, store, externalComponents, internalComponents }) => {
  const Preloader = creatorConfig.preloader;

  return (
    <React.Suspense fallback={Preloader ? <Preloader /> : <div />}>
      <ErrorBoundary fallback={creatorConfig.error}>
        {store ? (
          <FullApp
            store={store}
            creatorConfig={creatorConfig}
            internalComponents={internalComponents}
            externalComponents={externalComponents}
          />
        ) : (
          <BasicApp creatorConfig={creatorConfig} />
        )}
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default App;
