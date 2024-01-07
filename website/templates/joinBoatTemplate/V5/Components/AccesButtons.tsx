import { rightBlackIcon } from "@constants/icons/iconURLs";
import clsx from "clsx";
import React from "react";
interface Props {
  btnTxt?: string;
  btnStyle?: string;
  txtStyle?: string;
  isShowIcon?: boolean;
  textColor?: string;
  gotoComponent?: () => void;
}
const AccesButtons: React.FC<Props> = ({
  btnTxt,
  btnStyle,
  isShowIcon,
  textColor,
  txtStyle,
  gotoComponent,
}) => {
  return (
    <button
      onClick={gotoComponent}
      className={clsx(
        "rounded-full px-4 py-2.5  w-full  border flex items-center justify-center border-[#FFFFFF] ",
        btnStyle ? btnStyle : "bg-[#FFFFFF1A]"
      )}
      //   onClick={onNext}
      //   disabled={disabled}
    >
      <p
        className={clsx(
          "   font-baib py-1.5  text-center",
          txtStyle ? txtStyle : " text-sm iphoneX:text-base"
        )}
        style={{ color: textColor }}
      >
        {btnTxt}
      </p>
      {isShowIcon ? (
        <img src={rightBlackIcon} className="w-5 h-5 ml-2" />
      ) : null}
    </button>
  );
};

export default AccesButtons;
