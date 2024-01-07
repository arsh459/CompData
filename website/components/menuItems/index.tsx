import React from "react";
import clsx from "clsx";
import { menuItems } from "./constants";
import Link from "next/link";
import { joinGroupEvent } from "@analytics/click/ctaClicks";
// import Link from "next/link";
// import { handleHeaderClick } from "@util/analytics/header/menu";

interface Props {
  col?: boolean;
  userKey?: string;
  messageBadge: boolean | undefined;
  influencerId?: string;
  // uid?: string;
}

const MenuItems: React.FC<Props> = ({ col, userKey }) => {
  return (
    <div className={clsx(col ? "flex-col" : "flex items-center")}>
      {menuItems.map((item) => {
        // console.log("item", item.button, userKey);
        return (
          <Link href={item.link} key={item.text}>
            <div
              onClick={() => {
                item?.button ? joinGroupEvent("header") : null;
              }}
              // onClick={() => handleHeaderClick(item.text)}
              className={clsx(
                col ? "shadow-md p-4" : "mr-2 md:mr-4",
                "relative",
                !col && item.button
                  ? "bg-orange-500 p-2 rounded-lg shadow-lg"
                  : "",
                "flex items-center"
              )}
            >
              <p
                className={clsx(
                  !col && item.button
                    ? "text-md px-4 font-semibold"
                    : "text-lg font-light",
                  !col && item.button
                    ? "text-gray-50"
                    : "text-gray-300 hover:text-orange-500",
                  "hover:-translate-y-0.5 transition-transform transform hover:shadow-2xl"
                )}
              >
                {item.text === "Sign in" && userKey ? "Start Game" : item.text}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MenuItems;
