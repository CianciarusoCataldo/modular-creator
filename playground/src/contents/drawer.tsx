import classNames from "classnames";

import {
  getLocalizationConfig,
  getRoutes,
  isInDarkMode,
  requestRoute,
} from "modular-plugins";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Button, Divider } from "modular-ui-components";
import { closeDrawer } from "../modular-creator-preview";

const DrawerContent = () => {
  const dispatch = useDispatch();
  const PATHS = useSelector(getRoutes);
  const i18n = useSelector(getLocalizationConfig);
  const dark = useSelector(isInDarkMode);
  const { t } = useTranslation(i18n.titlesNamespace || i18n.defaultNamespace);

  return (
    <div>
      {Object.keys(PATHS)
        .sort()
        .map((route, index) => {
          return (
            <div className="mt-1 mb-3" key={`drawer_app_element_${index}`}>
              <Button
                unstyled
                onClick={() => {
                  dispatch(requestRoute(PATHS[route]));
                  dispatch(closeDrawer());
                }}
                className={classNames(
                  {
                    "text-white": dark,
                    "text-gray-600": !dark,
                  },
                  "hover:text-orange-500 text-xl"
                )}
              >
                {t(route)}
              </Button>
              <Divider dark={dark} />
            </div>
          );
        })}
    </div>
  );
};

const drawerSettings = {
  content: DrawerContent,
};

export default drawerSettings;
