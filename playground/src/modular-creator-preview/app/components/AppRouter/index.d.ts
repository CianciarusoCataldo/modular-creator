/// <reference types="react" />
import { History } from "history";
import { RouteProps } from "react-router-dom";
declare const AppRouter: ({ history, renderCallback, }: {
    history: History;
    renderCallback: (route: string) => RouteProps["component"];
}) => JSX.Element;
export default AppRouter;
