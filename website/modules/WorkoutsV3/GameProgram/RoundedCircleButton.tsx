import clsx from "clsx";
// import { format, parseISO } from "date-fns";
import React from "react";
// import LockOverlay from "../LockOverlay";
interface Props {
  ringColor?: string;
  bgColor: string;
  text?: string | number;
  textColor?: string;
  RingHWString?: string;
  // date?: string;
  overRideCss?: string;
  MainCircleHWString?: string;
  MainCircleBorder?: string;
  noRing?: boolean;
  lockedOverlay?: boolean;
}
const RoundedCircleButton: React.FC<Props> = ({
  ringColor,
  bgColor,
  text,
  RingHWString,
  MainCircleHWString,
  MainCircleBorder,
  noRing,
  textColor,
  // date,
  overRideCss,
  lockedOverlay,
}) => {
  // console.log("lockedOverlay", text, lockedOverlay);
  return (
    <div
      className={clsx(
        "relative",
        noRing
          ? ""
          : " bg-transparent border-2 p-0.5 rounded-full flex items-center justify-center ",
        noRing ? "" : RingHWString ? RingHWString : ""
      )}
      style={{ borderColor: ringColor }}
    >
      <div
        className={clsx(
          "flex items-center   justify-center text-white rounded-full text-sm font-semibold",
          MainCircleHWString ? MainCircleHWString : "h-10 w-10",
          MainCircleBorder ? MainCircleBorder : "",
          textColor ? textColor : "",
          overRideCss ? overRideCss : ""
        )}
        style={{ background: bgColor }}
      >
        {text}
      </div>
      {/* {lockedOverlay && <LockOverlay />} */}
    </div>
  );
};

export default RoundedCircleButton;
