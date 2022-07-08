import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeDrawer } from "../../../api/actions";
import { isDrawerOpen } from "../../../api/selectors";

import { Drawer } from "modular-ui-components";
import { driveWithDarkMode } from "../../utils";

const AppDrawer = ({
  children,
  position,
}: {
  children?: JSX.Element;
  position?: string;
}) => {
  const dispatch = useDispatch();
  const isDrawerShowing = useSelector(isDrawerOpen);

  /* istanbul ignore next */
  React.useEffect(() => {
    if (isDrawerShowing) {
      let element = document.getElementById("modular-drawer");
      let app = document.getElementById("app-container");
      if (app) {
        app.onclick = function (e: Event) {
          if (element && !element.contains(e.target as Node)) {
            dispatch(closeDrawer());
          }
        };
      }
    }
    return () => {
      let app = document.getElementById("app-container");

      if (app) {
        app.onclick = null;
      }
    };
  }, [dispatch, isDrawerShowing]);

  const DrawerComponent = driveWithDarkMode(Drawer);

  return (
    <DrawerComponent
      hide={!isDrawerShowing}
      onClose={() => {
        dispatch(closeDrawer());
      }}
      position={position}
    >
      {children}
    </DrawerComponent>
  );
};

export default AppDrawer;
