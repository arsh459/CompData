import { baseImageKit } from "@constants/icons/iconURLs";
import clsx from "clsx";
import React from "react";
interface Props {
  iconImgSrcWithHttp?: boolean;
  iconImgSrc?: string;
  textColor?: string;
  btnText?: string;
  bgColor?: string;
  btnStyle?: string;
  txtStyle?: string;
  imgStyle?: string;
}
const ButtonWithIcon: React.FC<Props> = ({
  iconImgSrc,
  iconImgSrcWithHttp,
  btnText,
  textColor,
  bgColor,
  btnStyle,
  txtStyle,
  imgStyle,
}) => {
  return (
    <button
      className={clsx(
        "flex  items-center justify-around px-3 py-1.5  iphoneX:px-5 iphoneX:py-3 rounded-lg  cursor-pointer mt-5",
        btnStyle
      )}
      style={{ background: bgColor ? bgColor : "#FFF" }}
    >
      {iconImgSrcWithHttp ? (
        <img src={iconImgSrc} alt="play" className={clsx("mr-2", imgStyle)} />
      ) : (
        <img
          src={`${baseImageKit}/tr:w-14,c-maintain_ratio/${iconImgSrc}`}
          alt="play"
          className={clsx("mr-2", imgStyle)}
        />
      )}
      <span
        className={clsx(
          " text-xs iphoneX:text-sm leading-3 font-medium  whitespace-nowrap  ",
          txtStyle
        )}
        style={{ color: textColor ? textColor : "#0085E0" }}
      >
        {btnText ? btnText : ""}
      </span>
    </button>
  );
};

export default ButtonWithIcon;
