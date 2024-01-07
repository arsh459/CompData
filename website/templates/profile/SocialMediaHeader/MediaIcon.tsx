import clsx from "clsx";
import React from "react";
import Image from "next/image";
import { Link } from "@mui/material";
import { linkType } from "./SocialMediaHeaderV1";
import { getLink } from "./utils";
// import Link from "next/link";
// import { socialMediaIcons } from "./constants";

interface Props {
  editing: boolean | undefined;
  active: boolean;
  link?: string;
  fallbackIcon?: string;
  icon: string;
  alt: string;
  size?: "sm";
  live?: boolean;
  linksLive?: boolean;
  linkType: linkType;
}

const MediaIcon: React.FC<Props> = ({
  editing,
  active,
  link,
  icon,
  alt,
  fallbackIcon,
  size,
  live,
  linksLive,
  linkType,
}) => {
  // console.log("link", link && live ? "present" : "absent", link, editing);
  return (
    <div>
      {link && live ? (
        <Link href={getLink(link, linkType)} target="_blank">
          <div className={clsx("pr-1")}>
            <Image
              alt={alt}
              src={icon}
              width={size === "sm" ? 24 : 28}
              height={size === "sm" ? 24 : 28}
              className={clsx(
                // "object-cover w-5 h-5",
                "hover:-translate-y-1 transition-transform transform hover:shadow-2xl"
              )}
            />
          </div>
        </Link>
      ) : link && !live && linksLive ? (
        <Link href={getLink(link, linkType)} target="_blank">
          <div className={clsx("")}>
            <Image
              alt={alt}
              src={icon}
              width={size === "sm" ? 24 : 28}
              height={size === "sm" ? 24 : 28}
              className={clsx(
                //   "object-cover w-5 h-5",
                "hover:-translate-y-1 transition-transform transform hover:shadow-2xl"
              )}
            />
          </div>
        </Link>
      ) : link ? (
        <div className={clsx("")}>
          <Image
            alt={alt}
            src={icon}
            width={size === "sm" ? 22 : 22}
            height={size === "sm" ? 22 : 22}
            className={clsx(
              //   "object-cover w-5 h-5",
              "hover:-translate-y-1 transition-transform transform hover:shadow-2xl"
            )}
          />
        </div>
      ) : editing && fallbackIcon ? (
        <Image
          alt={alt}
          src={fallbackIcon}
          width={size === "sm" ? 20 : 22}
          height={size === "sm" ? 20 : 22}
          className={clsx(
            // "object-cover w-5 h-5",
            "hover:-translate-y-1 transition-transform transform hover:shadow-2xl"
          )}
        />
      ) : null}
    </div>
  );
};

export default MediaIcon;
