import clsx from "clsx";
import Link from "next/link";
import React from "react";

// import { profileImg, name } from "./constants";

interface Props {
  size?: "sm" | "lg";
  imgUrl: string;
  selected: boolean;
  onClickURL: string;
  live?: boolean;
}

const ProfileImg: React.FC<Props> = ({
  imgUrl,
  size,
  selected,
  onClickURL,
  live,
  //   website,
}) => {
  // console.log("divider", size);
  return (
    <div>
      {!live ? (
        <img
          src={imgUrl}
          className={clsx(
            "object-cover rounded-full",
            size === "sm"
              ? "w-14 h-14 md:w-16 md:h-16"
              : size === "lg"
              ? "w-28 h-28"
              : "w-16 h-16",
            // "shadow-2xl",
            selected ? "shadow-2xl ring-white ring-2" : "shadow-lg"
          )}
        />
      ) : (
        <Link href={onClickURL}>
          <img
            src={imgUrl}
            className={clsx(
              "object-cover rounded-full ",
              size === "sm"
                ? "w-14 h-14 md:w-16 md:h-16"
                : size === "lg"
                ? "w-24 h-24"
                : "w-16 h-16",
              // "shadow-2xl",
              selected ? "shadow-2xl ring-white ring-2" : "shadow-lg"
            )}
          />
        </Link>
      )}
    </div>
  );
};

export default ProfileImg;
