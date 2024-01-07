import React from "react";
import clsx from "clsx";
import { menuItems } from "./constants";
import Link from "next/link";
import { joinGroupEvent } from "@analytics/click/ctaClicks";
import Facebook from "../../public/icons/social/Facebook";
import LinkedIn from "../../public/icons/social/LinkedIn";
import Twitter from "../../public/icons/social/Twitter";
import Instagram from "../../public/icons/social/Instagram";
import AnchorLink from "react-anchor-link-smooth-scroll";

// import classes from "./Hamburger.module.css";
// import { footerData } from "@templates/LandingPage/components/Footer/constants";

// const { startGameBtnBorder } = classes;

interface Props {
  col?: boolean;
  userKey?: string;
  messageBadge: boolean | undefined;
  influencerId?: string;
  onHide: () => void;
}

const MenuItems: React.FC<Props> = ({ col, userKey, onHide }) => {
  // footerData

  return (
    <div
      className={clsx("w-full text-white", col ? "block" : "flex items-center")}
    >
      {menuItems.map((item, idx) => {
        return (
          <div key={idx}>
            {item.anchor ? (
              <AnchorLink href={item.link}>
                <div
                  onClick={() => {
                    onHide();
                    item?.button ? joinGroupEvent("header") : null;
                  }}
                  className={clsx(
                    col
                      ? "shadow-md p-4 bg-[#F2F2F21C] w-75 my-5 mx-5 rounded-lg"
                      : idx === menuItems.length - 1
                      ? "2xl:mr-0 mr-4"
                      : "mr-2 md:mr-4",
                    "relative",
                    !col && item.button
                      ? "bg-orange-500 p-2 rounded-lg shadow-lg"
                      : "",
                    "flex justify-center items-center cursor-pointer"
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
                      "hover:-translate-y-0.5 transition-transform transform hover:shadow-2xl text-center"
                    )}
                  >
                    {item.text === "Sign in" && userKey
                      ? "Start Game"
                      : item.text}
                  </p>
                </div>
              </AnchorLink>
            ) : (
              <Link href={item.link} passHref>
                <div
                  onClick={() => {
                    item?.button ? joinGroupEvent("header") : null;
                  }}
                  className={clsx(
                    col
                      ? "shadow-md p-4 bg-[#F2F2F21C] w-75 my-5 mx-5 rounded-lg"
                      : idx === menuItems.length - 1
                      ? "2xl:mr-0 mr-4"
                      : "mr-2 md:mr-4",
                    "relative",
                    !col && item.button
                      ? "bg-orange-500 p-2 rounded-lg shadow-lg"
                      : "",
                    "flex justify-center items-center cursor-pointer"
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
                      "hover:-translate-y-0.5 transition-transform transform hover:shadow-2xl text-center"
                    )}
                  >
                    {item.text === "Sign in" && userKey
                      ? "Start Game"
                      : item.text}
                  </p>
                </div>
              </Link>
            )}
          </div>
        );
      })}

      <Link href="/teams" passHref>
        <div
          className={clsx(
            "shadow-md p-4 bg-[#F2F2F21C] w-75 my-28 mx-5 rounded-lg",
            "flex justify-center items-center text-center",
            col ? "" : "hidden "
          )}
        >
          Start Game
        </div>
      </Link>

      <div
        className={clsx(
          "p-4 w-75 mb-12 mx-5 justify-center",
          col ? "" : "hidden "
        )}
      >
        <div className="text-center block mb-5">Follow us</div>
        <div className="text-center flex justify-center items-center">
          <span className="px-2">
            <a href="https://twitter.com/socialboat_live">
              <Twitter
                style={{
                  fill: "gray",
                  height: "25px",
                  width: "25px",
                }}
              />
            </a>
          </span>
          <span className="px-2">
            <a href="https://www.linkedin.com/company/socialboat-live">
              <LinkedIn
                style={{
                  fill: "gray",
                  height: "25px",
                  width: "25px",
                }}
              />
            </a>
          </span>
          <span className="px-2">
            <a href="https://www.facebook.com/socialboat.live">
              <Facebook
                style={{
                  fill: "gray",
                  height: "25px",
                  width: "25px",
                }}
              />
            </a>
          </span>
          <span className="px-2">
            <a href="https://www.instagram.com/socialboat.live">
              <Instagram
                style={{
                  fill: "gray",
                  height: "25px",
                  width: "25px",
                }}
              />
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
