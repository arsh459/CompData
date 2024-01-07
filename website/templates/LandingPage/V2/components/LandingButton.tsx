import { weEventTrack } from "@analytics/webengage/user/userLog";
import clsx from "clsx";
import React from "react";
interface Props {
  btnStyle?: string;
  btnText?: string;
  bgColor?: string;
  txtColor?: string;
  borderColor?: string;
  onClickJump?: () => void;
}
export const LandingButton: React.FC<Props> = ({
  btnStyle,
  btnText,
  bgColor,
  borderColor,
  txtColor,
  onClickJump,
}) => {
  const onClick = () => {
    onClickJump && onClickJump();
    weEventTrack("landingPage_headerCtaClick", {});
  };

  return (
    <button
      suppressHydrationWarning
      className={clsx(
        "px-6 py-2 w-full cursor-pointer whitespace-nowrap",
        btnStyle ? btnStyle : "text-xs",
        borderColor && "border-[1px]"
      )}
      style={{
        backgroundColor: bgColor ? bgColor : undefined,
        color: txtColor ? txtColor : undefined,
        borderColor: borderColor ? borderColor : undefined,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};
