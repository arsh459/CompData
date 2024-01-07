import clsx from "clsx";
import { baseImageKit } from "@constants/icons/iconURLs";

interface Props {
  iconImgSrcWithHttp?: boolean;
  iconImgSrc?: string;
  textColor?: string;
  btnText?: string;
  bgColor?: string;
  btnStyle?: string;
  txtStyle?: string;
  imgStyle?: string;
  onClick: () => void;
}

const ButtonWithIconV2: React.FC<Props> = ({
  iconImgSrc,
  iconImgSrcWithHttp,
  btnText,
  textColor,
  bgColor,
  btnStyle,
  txtStyle,
  imgStyle,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        btnStyle
          ? btnStyle
          : "flex items-center justify-around px-3 py-1.5 iphoneX:px-5 iphoneX:py-3 rounded-lg font-baiSb",
        "cursor-pointer backdrop-blur"
      )}
      style={{ background: bgColor ? bgColor : "#FFF" }}
    >
      {iconImgSrcWithHttp && iconImgSrc ? (
        <img
          src={iconImgSrc}
          alt="play"
          className={clsx(imgStyle ? imgStyle : "mr-2")}
        />
      ) : iconImgSrc ? (
        <img
          src={`${baseImageKit}/tr:w-14,c-maintain_ratio/${iconImgSrc}`}
          alt="play"
          className={clsx("mr-2", imgStyle)}
        />
      ) : null}
      <span
        className={clsx(
          "iphoneX:text-base",
          txtStyle ? txtStyle : " text-xs iphoneX:text-sm  whitespace-nowrap  "
        )}
        style={{ color: textColor ? textColor : "#0085E0" }}
      >
        {btnText ? btnText : ""}
      </span>
    </button>
  );
};

export default ButtonWithIconV2;
