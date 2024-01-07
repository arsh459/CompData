import React from "react";
import clsx from "clsx";
// import MenuItems from "../menuItems/index";
// import HanburgerMenu from "../menuItems/HamburgerMenu";
import HolidayingLogo from "../logo/index";
import { Popover } from "@headlessui/react";

// import MenuButton from "@components/menuItems/MenuButton";

interface Props {
  menuVisible?: boolean;
  //   onClick: () => void;
}

const DrawerHeader: React.FC<Props> = ({ menuVisible }) => {
  return (
    <div className="shadow-2xl bg-white">
      <div className={clsx("p-4 flex items-center justify-between")}>
        {menuVisible ? (
          <div className="">
            {/* <MenuButton messageBadge={false} onClick={onClick} /> */}
            <Popover.Button>
              <img
                src="/menu-outline.svg"
                className="h-10"
                alt="menu"
                loading="lazy"
              />
            </Popover.Button>
          </div>
        ) : null}
        <div>
          <HolidayingLogo text link="/dashboard" />
        </div>
        {menuVisible ? <div className="h-1"></div> : null}
      </div>
    </div>
  );
};

export default DrawerHeader;
