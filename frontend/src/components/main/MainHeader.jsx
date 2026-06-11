const MainHeader = ({ title, subtitle }) => {
  return (
    <header className="content__header">
      <div className="content__container">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </header>
  );
};

export default MainHeader;
