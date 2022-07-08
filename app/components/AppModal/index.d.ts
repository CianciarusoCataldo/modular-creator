/// <reference types="react" />
declare const AppModal: ({ modals, namespace, }: {
    modals: Record<string, () => JSX.Element>;
    namespace?: string;
}) => JSX.Element;
export default AppModal;
