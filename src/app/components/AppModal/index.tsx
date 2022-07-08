import React from "react";
import { useSelector } from "react-redux";

import { closeModal, getModalType, isModalVisible } from "modular-plugins";

import { Modal } from "modular-ui-components";
import { driveWithDarkMode } from "../../utils";
import { ModularEngineStore } from "modular-engine";

const AppModal = ({
  modals,
  namespace,
  store,
}: {
  modals: Record<string, () => JSX.Element>;
  namespace?: string;
  store: ModularEngineStore;
}) => {
  const type = useSelector(getModalType);
  const isVisible = useSelector(isModalVisible);
  const ModalContent = type && modals[type] ? modals[type] : () => <div />;

  const ModalComponent = driveWithDarkMode(Modal);

  return (
    <ModalComponent
      onClose={() => store.dispatch(closeModal())}
      hide={!isVisible}
    >
      <ModalContent />
    </ModalComponent>
  );
};

export default AppModal;
