import React, { useRef, useState } from "react";
import clsx from "clsx";
import MenuItems from "./index";
import useOutsideAlerter from "@hooks/utils/useOutsideAlerter";
import MenuButton from "./MenuButton";

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
    <div className={clsx("relative z-20")} ref={divRef}>
      <MenuButton
        messageBadge={messageBadge}
        onClick={() => showModal(!modalVisible)}
      />
      {modalVisible ? (
        <div className={clsx("absolute right-0 top-10")}>
          <div className={clsx("w-52 bg-gray-100 rounded-xl shadow-2xl")}>
            <MenuItems
              col={true}
              userKey={userKey}
              messageBadge={messageBadge}
              influencerId={influencerId}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HanburgerMenu;
