import React, { useRef, useState } from "react";
import clsx from "clsx";
import MenuItems from "./index";
import useOutsideAlerter from "@hooks/utils/useOutsideAlerter";
import MenuButton from "./MenuButton";
// import classes from "./Hamburger.module.css";

// const { overlayContent, overlay } = classes;

interface Props {
  messageBadge: boolean | undefined;
  influencerId?: string;
  userKey?: string;
}

const HanburgerMenu: React.FC<Props> = ({
  messageBadge,
  influencerId,
  userKey,
}) => {
  const [modalVisible, showModal] = useState<boolean>(false);

  const divRef = useRef(null);
  useOutsideAlerter(divRef, () => showModal(false), modalVisible);

  return (
    <div className={clsx("relative")} ref={divRef}>
      <MenuButton
        messageBadge={messageBadge}
        onClick={() => showModal(!modalVisible)}
        showCloseBtn={modalVisible}
      />

      <div
        id="myNav"
        className={clsx(
          "fixed inset-0 -z-10 transition-all duration-500",
          "bg-black/[0.20] backdrop-blur-2xl",
          modalVisible ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="w-full h-full grid items-end">
          <MenuItems
            col={true}
            userKey={userKey}
            onHide={() => showModal(false)}
            messageBadge={messageBadge}
            influencerId={influencerId}
          />
        </div>
      </div>
    </div>
  );
};

export default HanburgerMenu;
