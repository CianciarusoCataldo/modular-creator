import React from "react";
import { ModularEngineStore } from "modular-engine-types";

import { Provider } from "react-redux";
import { mount } from "enzyme";

import { openModal } from "modular-plugins";

import AppModal from "../../../src/app/components/AppModal";

const AppModalTest = (store: ModularEngineStore) => {
  describe("\n     AppModal\n", () => {
    test("renders correctly", () => {
      let wrapper = mount(
        <Provider store={store}>
          <AppModal modals={{}} />
        </Provider>
      );
      expect(wrapper.find("#modular-modal").length).toBeGreaterThan(0);
    });
    test("after dispatching openModal action, shows the correct form", () => {
      store.dispatch(openModal({ form: "test" }));

      const wrapper = mount(
        <Provider store={store}>
          <AppModal
            modals={{
              test: () => <div data-id="test-form">test form</div>,
            }}
          />
        </Provider>
      );

      expect(wrapper.find('div[data-id="test-form"]').length).toBeGreaterThan(
        0
      );
    });

    test("close correctly when closeModal action is dispatched", () => {
      const wrapper = mount(
        <Provider store={store}>
          <AppModal
            modals={{
              test: () => <div data-id="test-form">test form</div>,
            }}
          />
        </Provider>
      );
      wrapper.find(".close-button").at(1).simulate("click");
    });
  });
};

export default AppModalTest;
