import { driveWithDarkMode } from "modular-creator-preview";
import { Container } from "modular-ui-components";

/** Modular-app home page */
const HomePage = () => {
  const AppContainer = driveWithDarkMode(Container);

  return (
    <AppContainer animated unstyled>
      <div/>
    </AppContainer>
  );
};

export default HomePage;
