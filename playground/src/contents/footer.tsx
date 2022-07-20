import { isInDarkMode } from "modular-plugins";
import { Container } from "modular-ui-components";
import { useSelector } from "react-redux";

const FooterContent = () => {
  const dark = useSelector(isInDarkMode);

  return (
    <Container dark={dark}>
      <div className="flex flex-col items-center mt-2">
        <div className="flex flex-row p-2">
          <img
            alt=""
            className="p-1"
            src="https://img.shields.io/github/license/cianciarusocataldo/modular-creator"
            height="25"
          />

          <img
            alt=""
            className="p-1"
            src="https://img.shields.io/github/package-json/v/cianciarusocataldo/modular-creator?label=latest%20version"
            height="25"
          />
        </div>
      </div>
    </Container>
  );
};

export default FooterContent;
