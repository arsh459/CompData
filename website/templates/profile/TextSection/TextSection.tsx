import clsx from "clsx";
import Link from "next/link";
import React from "react";
// import { profileImg, name } from "./constants";

interface Props {
  editing: boolean | undefined;
  text: string | undefined;
  active: boolean;
  editingPlaceholder: string;
  placeholder: string;
  boldLevel: "medium" | "normal" | "semibold";
  textPrefix: string;
  textSize: "sm" | "base" | "lg" | "xs" | "xl" | "2xl";
  onClickURL: string;
  live?: boolean;
  vertical?: boolean;
  lineClamp?: "line-clamp-1" | "line-clamp-2";
}

const TextSection: React.FC<Props> = ({
  editing,
  text,
  active,
  editingPlaceholder,
  placeholder,
  textPrefix,
  boldLevel,
  textSize,
  live,
  onClickURL,
  vertical,
  lineClamp,
}) => {
  return (
    <div
      className={clsx(active && editing ? "bg-white shadow-lg pl-2 pr-2" : "")}
    >
      {live && onClickURL ? (
        <Link href={onClickURL}>
          <p
            className={clsx(
              vertical ? "text-center" : "",
              active && editing
                ? "text-gray-700"
                : editing
                ? "text-gray-400"
                : "text-gray-700",
              boldLevel === "semibold"
                ? "font-semibold"
                : boldLevel === "medium"
                ? "font-medium"
                : "font-normal",
              "flex",
              lineClamp ? lineClamp : "",
              textSize === "sm"
                ? "text-sm"
                : textSize === "lg"
                ? "text-lg"
                : textSize === "xl"
                ? "text-lg md:text-xl"
                : textSize === "2xl"
                ? "text-2xl"
                : "text-sm md:text-base"
            )}
          >
            {text
              ? `${textPrefix}${text}`
              : !text && editing
              ? editingPlaceholder
              : placeholder}
          </p>
        </Link>
      ) : (
        <p
          className={clsx(
            vertical ? "text-center" : "",
            active && editing
              ? "text-gray-700"
              : editing
              ? "text-gray-400"
              : "text-gray-700",
            lineClamp ? lineClamp : "",
            boldLevel === "semibold"
              ? "font-semibold"
              : boldLevel === "medium"
              ? "font-medium"
              : "font-normal",
            "flex",
            textSize === "sm" ? "text-sm" : textSize === "lg" ? "text-lg" : ""
          )}
        >
          {text
            ? `${textPrefix}${text}`
            : !text && editing
            ? editingPlaceholder
            : placeholder}
        </p>
      )}
    </div>
  );
};

export default TextSection;
