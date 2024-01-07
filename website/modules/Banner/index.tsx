// import Button from "@components/button";
import { ProfileProps } from "@templates/profile";
import clsx from "clsx";
import React from "react";
import MobileInteractive from "./MobileInteractive/MobileInteractive";

interface Props {
  // editMobile?: boolean;
  profileProps?: ProfileProps;
}

const Banner: React.FC<Props> = ({ children, profileProps }) => {
  // console.log("profile", profileProps);
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="items-center flex flex-col flex-1 ">
        <div className="pt-36 sm:pt-48 md:pt-0 md:flex-grow" />
        {children}
        <div className="pb-10 md:pb-0 md:flex-grow" />
      </div>
      <div className="flex-[2] md:flex-1 md:pt-28">
        <div className={clsx("flex items-center justify-center")}>
          {profileProps ? (
            <MobileInteractive
              screen="home"
              profileProps={profileProps}
              size="medium"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Banner;
