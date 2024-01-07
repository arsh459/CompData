import clsx from "clsx";
import React from "react";
// import { socialMediaIcons } from "./constants";

interface Props {
  socialIcons: socialMediaIcon[];
}

export interface socialMediaIcon {
  name: string;
  icon: string;
}

const SocialMediaHeader: React.FC<Props> = ({ socialIcons }) => {
  return (
    <div className={clsx("flex justify-center")}>
      {socialIcons.map((item) => {
        return (
          <div key={item.name} className={clsx("p-1 shadow-lg m-1 rounded-lg")}>
            <img
              src={item.icon}
              className={clsx(
                "object-cover w-4 h-4",
                "hover:-translate-y-1 transition-transform transform shadow-lg hover:shadow-2xl"
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SocialMediaHeader;
