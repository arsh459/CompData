import clsx from "clsx";
import React from "react";
interface Props {
  footerText?: string;
  topTextNode?: JSX.Element;
  mediumTextNode?: JSX.Element;
  footerTextClassStr?: string;
  bgColor?: string;
}
const DetailInfo: React.FC<Props> = ({
  footerText,
  topTextNode,
  mediumTextNode,
  footerTextClassStr,
  bgColor,
}) => {
  return (
    <div
      className={clsx(
        "py-4 flex flex-col h-full aspect-1 text-white rounded-3xl",
        bgColor ? bgColor : "bg-[#1B192B]"
      )}
    >
      <div className="p-2 px-6 flex justify-center items-center flex-col flex-1">
        {topTextNode}
        {mediumTextNode}
      </div>
      <div className="h-px my-3 bg-[#FFFFFF24]" />
      <p
        className={clsx(
          "px-6 whitespace-nowrap font-normal text-center font-bail",
          footerTextClassStr
            ? footerTextClassStr
            : "text-base sm:text-xl lg:text-2xl"
        )}
      >
        {footerText}
      </p>
    </div>
  );
};

export default DetailInfo;
