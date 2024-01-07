import React from "react";
import clsx from "clsx";
import MenuItems from "../menuItems/index";
import HanburgerMenu from "../menuItems/HamburgerMenu";
import HolidayingLogo from "../logo/index";

interface Props {
  menuVisible?: boolean;
  noShadow?: boolean;
  userKey?: string;
  // uid?: string;
}

const Header: React.FC<Props> = ({ menuVisible, noShadow, userKey }) => {
  return (
    <div className={noShadow ? "" : "shadow-2xl"}>
      <div
        className={clsx(
          "p-4 md:pl-12 md:pr-12 flex items-center justify-between",
          "max-w-screen-xl mx-auto"
        )}
      >
        <div>
          <HolidayingLogo text />
        </div>
        {menuVisible ? (
          <div className="hidden sm:block">
            <MenuItems messageBadge={false} userKey={userKey} />
          </div>
        ) : null}
        {menuVisible ? (
          <div className="sm:hidden">
            <HanburgerMenu messageBadge={false} userKey={userKey} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
