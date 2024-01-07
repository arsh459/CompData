import React from "react";
import clsx from "clsx";
import MenuItems from "../menuItemsV2/index";
import HanburgerMenu from "../menuItemsV2/HamburgerMenu";
import HolidayingLogoV2 from "../logoV2";

interface Props {
  menuVisible?: boolean;
  noShadow?: boolean;
}

const Header: React.FC<Props> = ({ menuVisible, noShadow }) => {
  console.log("in header");
  return (
    <div className={noShadow ? "" : "shadow-2xl"}>
      <div
        className={clsx(
          "flex items-center justify-between",

          "py-4",

          "max-w-screen-xl mx-auto"
        )}
      >
        <div className="pl-4 2xl:pl-0">
          <HolidayingLogoV2 text size="medium" />
        </div>
        {menuVisible ? (
          <div className="hidden sm:block ">
            <MenuItems messageBadge={false} onHide={() => {}} />
          </div>
        ) : null}
        {menuVisible ? (
          <div className="sm:hidden pr-4 2xl:pr-0">
            <HanburgerMenu messageBadge={false} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
