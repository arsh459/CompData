import { logoPNG } from "@templates/LandingPage/constants";
import clsx from "clsx";
import React from "react";

interface Props {
  text?: boolean;
  size?: "large" | "small" | "medium" | undefined;
  link?: string;
}

// const logoDims = {
//   small: { width: "20px", height: "20px" },
//   medium: { width: "50px", height: "50px" },
//   large: { width: "70px", height: "70px" },
// };

// const fontSize = {
//   small: "text-base",
//   medium: "text-3xl",
//   large: "text-4xl",
// };

const HolidayingLogoV2: React.FC<Props> = ({ text, size, link }) => {
  return (
    <a className="flex flex-none items-center" href={link ? link : "/"}>
      <img src={logoPNG} className="h-10 object-cover" alt="logo" />
      {/* <HolidayingLogo style={size ? { ...logoDims[size] } : {}} /> */}
      {text ? (
        <div className={clsx("pl-4 text-white font-semibold text-2xl")}>
          SocialBoat
        </div>
      ) : null}
    </a>
  );
};

export default HolidayingLogoV2;
