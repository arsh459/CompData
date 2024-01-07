import Button from "@components/button";
import TypingText from "@components/typing/TypingText";
import { homeDomain } from "@constants/seo";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import PHBanner from "./phBanner";

export interface LaunchCourseProps {
  textPrefix: string;
  textPrimary: string;
  textSuffix: string;
  buttonText?: string;
  buttonLabel?: string;
  buttonLink?: string;
  textWeight: "black" | "medium";
  textSize: "xl" | "large" | "medium";
  kpis: string[];
  textFlow: "fixed" | "flow";
  textCenter: boolean;
  dynamicText?: boolean;
  strings?: string[];
  preStringTyped?: (num: number) => void;
  buttonClick?: any;
  userKey?: string;
  phBanner?: boolean;
}

const LaunchCourse: React.FC<LaunchCourseProps> = ({
  textPrefix,
  textPrimary,
  textSuffix,
  buttonText,
  buttonLabel,
  textWeight,
  kpis,
  textFlow,
  textCenter,
  textSize,
  buttonLink,
  dynamicText,
  strings,
  preStringTyped,
  buttonClick,
  userKey,
  phBanner,
}) => {
  return (
    <div
      className={clsx(
        " md:pl-4 md:pr-4",
        textFlow === "fixed" ? "mx-auto w-[324px] md:w-[480px]" : "w-full"
        // "w-full"
      )}
    >
      <div className={clsx("flex flex-col", textCenter ? "items-center" : "")}>
        {phBanner ? (
          <div
            className={clsx("pb-0 flex", textCenter ? "justify-center" : "")}
          >
            <PHBanner />
          </div>
        ) : null}
        <h1
          className={clsx(
            "flex-none",
            textSize === "xl"
              ? "text-5xl md:text-7xl"
              : textSize === "large"
              ? "text-5xl lg:text-6xl"
              : "text-5xl",
            textWeight === "black" ? "font-black" : "font-bold text-gray-700",
            textCenter ? "text-center" : ""
          )}
        >
          {textPrefix}
        </h1>
        {dynamicText && strings && strings.length > 0 && preStringTyped ? (
          <div>
            <TypingText strings={strings} preStringTyped={preStringTyped} />
          </div>
        ) : null}
        <h1
          className={clsx(
            "text-orange-500",
            textSize === "xl"
              ? "text-5xl md:text-7xl"
              : textSize === "large"
              ? "text-5xl lg:text-6xl"
              : "text-5xl",
            textWeight === "black" ? "font-black" : "font-bold text-gray-700",
            textCenter ? "text-center" : ""
          )}
        >
          {textPrimary}
        </h1>
        <h1
          className={clsx(
            "flex-none",
            textSize === "xl"
              ? "text-5xl md:text-7xl"
              : textSize === "large"
              ? "text-5xl lg:text-6xl"
              : "text-5xl",
            textWeight === "black" ? "font-black" : "font-bold text-gray-700",
            textCenter ? "text-center" : ""
          )}
        >
          {textSuffix}
        </h1>
      </div>
      <div
        className={clsx("pt-2", textCenter ? "flex flex-col items-center" : "")}
      >
        {kpis.map((item) => {
          return (
            <p
              className={clsx(
                "text-2xl font-normal text-gray-500",
                textCenter ? "text-center" : ""
              )}
              key={item}
            >
              {item}
            </p>
          );
        })}
      </div>
      {buttonText && buttonLink && buttonClick ? (
        <div className={clsx("pt-4 flex", textCenter ? "justify-center" : "")}>
          <Link href={userKey ? `https://${homeDomain}/teams` : buttonLink}>
            <Button appearance="contained" onClick={buttonClick}>
              <p className={clsx("capitalize font-semibold text-lg")}>
                {buttonText}
              </p>
            </Button>
          </Link>
        </div>
      ) : null}
      {buttonLabel ? (
        <div className={clsx("pt-2 flex", textCenter ? "justify-center" : "")}>
          <div
            className={clsx(
              "flex shadow-2xl",
              textCenter ? "justify-center" : ""
            )}
          >
            <p
              className={clsx(
                "text-xs text-gray-700 font-medium",
                textCenter ? "text-center" : ""
              )}
            >
              {buttonLabel}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LaunchCourse;
