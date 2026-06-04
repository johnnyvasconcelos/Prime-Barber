import { FaTimes } from "react-icons/fa";

const CloseMenu = ({ setMenu }) => {
  return (
    <>
      <div
        className="aside__close"
        onClick={() => {
          setMenu(false);
        }}
      >
        <FaTimes />
      </div>
    </>
  );
};

export default CloseMenu;
