const FooterContent = () => {
  return (
    <div className="flex flex-col items-center h-full w-full py-4">
      <div className="flex flex-row m-auto">
        <img
          alt=""
          className="p-1"
          src="https://img.shields.io/github/license/cianciarusocataldo/modular-creator"
          height="25"
        />

        <img
          alt=""
          className="p-1"
          src="https://img.shields.io/github/package-json/v/modular-creator?label=latest%20version"
          height="25"
        />
      </div>
    </div>
  );
};

export default FooterContent;
