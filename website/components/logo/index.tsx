import clsx from "clsx";
import React from "react";

interface Props {
  text?: boolean;
  size?: "large" | "small" | "medium";
  link?: string;
}

const HolidayingLogo: React.FC<Props> = ({ text, size, link }) => {
  return (
    <a className="flex flex-shrink-0 items-center" href={link ? link : "/"}>
      <img
        className={clsx(
          size === "large" ? "h-10" : size === "small" ? "h-6" : "h-7 lg:h-10"
        )}
        src="/images/logo.svg"
        alt="Holidaying Logo"
      />
      {text ? (
        <div className={clsx("pl-2")}>
          <img
            className={clsx(
              size === "medium"
                ? "h-8 object-cover"
                : size === "large"
                ? "h-10 object-cover"
                : size === "small"
                ? "h-5 object-cover"
                : "h-6 lg:h-8 object-cover"
            )}
            src="/images/SocialBoat.png"
            alt="SocialBoat.live"
          />
        </div>
      ) : null}
    </a>
  );
};

export default HolidayingLogo;
