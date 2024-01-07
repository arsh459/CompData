import React from "react";
import clsx from "clsx";
// import MenuItems from "./index";
// import useOutsideAlerter from "@hooks/utils/useOutsideAlerter";

interface Props {
  messageBadge: boolean | undefined;
  onClick: () => void;
}

const MenuButton: React.FC<Props> = ({ messageBadge, onClick }) => {
  return (
    <button className={clsx("focus:outline-none")} onClick={onClick}>
      <img src="/menu-outline.svg" className="h-10" alt="menu" />
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
