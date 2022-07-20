import { FormsPlugin } from "./types";

import AppModal from "./component";

const formsPlugin: FormsPlugin = () => ({
  feature: "forms",
  internal: false,
  component: AppModal,
  field: (creator) => {
    let formsConfig = creator.forms || {};

    return {
      name: "forms",
      content: {
        modals: formsConfig.modals || {},
        getDarkMode: formsConfig.getDarkMode || (() => false),
        getModalProps:
          formsConfig.getModalProps ||
          ((state: any) => ({ isVisible: false, type: "" })),
        onClose: formsConfig.onClose || (() => {}),
      },
    };
  },
});

export default formsPlugin;
