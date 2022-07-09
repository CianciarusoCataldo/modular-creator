const FooterContent = () => {
  return (
    <div className="flex flex-col items-center h-full w-full py-4">
      <div className="flex flex-row m-auto">
        <img
          alt=""
          className="p-1"
          src="https://img.shields.io/github/license/cianciarusocataldo/modular-creator?style=for-the-badge"
          height="25"
        />

        <img
          alt=""
          className="p-1"
          src="https://img.shields.io/npm/v/modular-creator?color=orange%20&label=Latest%20version&style=for-the-badge&logo=npm"
          height="25"
        />
      </div>
    </div>
  );
};

export default FooterContent;
