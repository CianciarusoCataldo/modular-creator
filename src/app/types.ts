import { RouteProps } from "react-router-dom";
import { ModularEngineConfig } from "modular-engine";
import { DrawerProps } from "modular-ui-components";

/** Modular app config, to control app behaviour */
/** enable/disable debug mode */
export type AppConfig = {
  debug?: boolean;

  /** Preloader element, displayed during loading (as fallback) */
  preloader?: () => JSX.Element;

  /** Error custom component, rendered when an error is catched by the App Error Boundary (if not set, the default error fallback will be used) */
  error?: () => JSX.Element;

  /** Custom route rendering function, to return the right component based on the given route (if not set, router won't be loaded) */
  pagesRendering?: (route: string) => RouteProps["component"];

  /** App drawer content (if not set, drawer won't be rendered) */
  drawer?: {
    /** App drawer custom content */
    content: () => JSX.Element;

    /** App Drawer position (relative to the window) */
    position?:string;
  };

  /** Custom modals object. Keys are the modals types, values are component to render inside the modal, when opened */
  modals?: Record<string, () => JSX.Element>;

  /** Header custom component (if not set, header won't be rendered) */
  header?: () => JSX.Element;

  /** Footer custom component (if not set, footer won't be rendered) */
  footer?: () => JSX.Element;

  /** Custom component, rendered below the router, before the footer */
  content?: () => JSX.Element;

  modalNamepsace?: string;
};

export type Init = (props: {
  appConfig?: AppConfig;

  engine?: ModularEngineConfig;

  /** Callback called at the end of the init process */
  onComplete?: (App: () => JSX.Element) => any;

  /** Callback called before any init operation */
  onStart?: () => any;
}) => Promise<{ App: () => JSX.Element }>;
