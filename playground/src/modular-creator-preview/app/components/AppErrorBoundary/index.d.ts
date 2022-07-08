import React from "react";
/** Modular error boundary, wrap all App components to intercept most of the errors thrown
 *
 * @param {() => JSX.Element} fallback custom fallback displayed when an error is catched
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright 2022 Cataldo Cianciaruso
 */
declare class ErrorBoundary extends React.Component<{
    fallback?: () => JSX.Element;
}, {
    hasError: boolean;
}> {
    constructor(props: any);
    static getDerivedStateFromError(error: any): {
        hasError: boolean;
    };
    componentDidCatch(error: any, errorInfo: any): void;
    render(): React.ReactNode;
}
export default ErrorBoundary;
