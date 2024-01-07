import React from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import clsx from "clsx";

interface MenuItem {
  label: string;
  href: string;
}

interface Props {
  menuItems: MenuItem[];
  onSignOut: () => void;
}

const menuItemBaseStyles =
  "whitespace-nowrap py-2 text-[#494949] text-sm text-center border-t font-nunitoM border-[#00000026] cursor-pointer";
const linkStyles = "px-4";
const logoutStyles = "px-4";

const DropdownMenu: React.FC<Props> = ({ menuItems, onSignOut }) => {
  return (
    <>
      {menuItems.map((menuItem, index) => (
        <Menu.Item key={index}>
          <Link href={menuItem.href}>
            <p className={clsx(menuItemBaseStyles, linkStyles)}>
              {menuItem.label}
            </p>
          </Link>
        </Menu.Item>
      ))}
      <Menu.Item>
        <p
          onClick={onSignOut}
          className={clsx(menuItemBaseStyles, logoutStyles)}
        >
          Log Out
        </p>
      </Menu.Item>
    </>
  );
};

export default DropdownMenu;
