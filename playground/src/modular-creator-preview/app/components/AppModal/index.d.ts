/// <reference types="react" />
import { ModularEngineStore } from "modular-engine";
declare const AppModal: ({ modals, namespace, store, }: {
    modals: Record<string, () => JSX.Element>;
    namespace?: string;
    store: ModularEngineStore;
}) => JSX.Element;
export default AppModal;
