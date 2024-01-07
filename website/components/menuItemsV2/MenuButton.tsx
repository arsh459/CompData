import React from "react";
import clsx from "clsx";
import HamBurger from "../../public/icons/HamBurger";
import CloseIcon from "../../public/icons/CloseIcon";

interface Props {
  messageBadge: boolean | undefined;
  showCloseBtn: boolean | undefined;
  onClick: () => void;
}

const MenuButton: React.FC<Props> = ({
  messageBadge,
  onClick,
  showCloseBtn,
}) => {
  return (
    <button className={clsx("focus:outline-none")} onClick={onClick}>
      {showCloseBtn ? (
        <CloseIcon style={{ fill: "white" }} />
      ) : (
        <HamBurger style={{ fill: "white" }} />
      )}
      {messageBadge ? (
        <div
          className={clsx(
            "bg-orange-500 w-3 h-3 rounded-full",
            "absolute top-1 right-1 z-10"
          )}
        />
      ) : null}
    </button>
  );
};

export default MenuButton;
