import clsx from "clsx";
import React from "react";
import ArrowIconSvg from "./SvgIcons/ArrowIconSvg";
interface Props {
  heading?: string;
  topRightText?: string;
  modalOpener?: string;
  children?: React.ReactNode;
  onLeft?: () => void;
  onRight?: () => void;
  index?: number;
  total: number;
}
const GoalProgramContainer: React.FC<Props> = ({
  heading,
  modalOpener,
  topRightText,
  children,
  onLeft,
  onRight,
  index,
  total,
}) => {
  return (
    <div className="rounded-[1.75rem] flex flex-col h-full border border-[#797979] px-4 pb-4 bg-gradient-to-b from-[#2B2B2B] to-black ">
      <div
        className={clsx(
          "flex items-center justify-between",
          heading ? "pt-4" : ""
        )}
      >
        {onLeft && index ? (
          <p onClick={onLeft} className="cursor-pointer">
            <ArrowIconSvg side="left" />
          </p>
        ) : (
          <div />
        )}
        <h5 className="text-white text-lg iphoneX:text-2xl font-bold">
          {heading}
        </h5>
        {onRight && total - 1 !== index ? (
          <p onClick={onRight} className="cursor-pointer">
            <ArrowIconSvg side="right" />{" "}
          </p>
        ) : (
          <div />
        )}
        {/* <h5 className="text-[#F19B38] font-medium">{}</h5> */}
      </div>
      {children}
    </div>
  );
};

export default GoalProgramContainer;
