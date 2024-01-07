import React from "react";
import clsx from "clsx";
import classes from "./TextLayout.module.css";
// import { isMobile } from "mobile-device-detect";

interface Props {
  headingText?: string;
  textPrimary?: string;
  lightHeaderText?: string;
  subHeadingText?: string;
  size?: "large" | "medium" | "small" | undefined;
  fullWidth?: boolean;
  halfWidth?: boolean;
}

const { lightText } = classes;
const TextLayout: React.FC<Props> = ({
  headingText,
  subHeadingText,
  fullWidth = false,
  halfWidth = false,
  lightHeaderText,
  textPrimary,
  size,
}) => {
  return (
    <>
      <div className="text-center text-white flex flex-col justify-center items-center">
        {lightHeaderText ? (
          <div className="w-full md:w-3/4 xl:w-3/4 mb-2">
            <h1 className={clsx("text-4xl text-white", lightText)}>
              {lightHeaderText}
            </h1>
          </div>
        ) : null}

        <div
          className={clsx(
            "w-full"
            // "w-full lg:w-1/2  mb-1",
            // "border",
            // halfWidth ? "" : "xl:w-3/4"
          )}
        >
          <h1
            className={clsx(
              "text-white font-semibold font-mont",
              size === "medium"
                ? "text-5xl md:text-5xl"
                : "text-5xl md:text-7xl"
            )}
          >
            {headingText}
          </h1>
          <h1
            className={clsx(
              "text-[#FF5970] font-semibold font-mont",
              size === "medium"
                ? "text-5xl md:text-5xl"
                : "text-5xl md:text-7xl"
            )}
          >
            {textPrimary}
          </h1>
        </div>

        {/* {headingText ? (
          <div
            className={clsx(
              heading,
              classes[size || "heading"],
              fullWidth && !isMobile ? "w-full" : "w-2/4"
            )}
          >
            {headingText}
          </div>
        ) : null} */}

        <div className="w-3/4">
          <div
            className={clsx(
              "text-white font-montL",
              "text-[#a79f9f]",
              size === "medium" ? "text-xl" : "text-2xl"
            )}
          >
            {subHeadingText}
          </div>
        </div>
      </div>
    </>
  );
};

export default TextLayout;
