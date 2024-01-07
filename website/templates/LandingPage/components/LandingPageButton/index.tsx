import React from "react";
import clsx from "clsx";
import classes from "./LPButton.module.css";
import Link from "next/link";

interface Props {
  buttonText: string | object;
  whiteBorder?: boolean;
  link: string;
}

const { outer, inner, text, whiteBtn } = classes;
const RippleButton: React.FC<Props> = ({ buttonText, whiteBorder, link }) => {
  return (
    <>
      <Link href={link} passHref>
        <span className={clsx(outer, whiteBorder ? whiteBtn : "")}>
          <span className={clsx(inner, "bg-black font-sans")}>
            <span className={clsx(text)}>{buttonText}</span>
          </span>
        </span>
      </Link>
    </>
  );
};

export default RippleButton;
