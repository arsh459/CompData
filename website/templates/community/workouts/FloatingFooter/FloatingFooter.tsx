import clsx from "clsx";
import React from "react";
import Button from "@components/button/index";
import { Link } from "@mui/material";
// import Price from "../HeadingSection/Price";
// import TopStrip from "./TopStrip";

interface Props {
  //   price?: number;
  //   currency?: "₹";
  onClick: () => void;
  leftText?: string;
  link?: string;
  appearance?: "contained" | "ghost" | "outline";
  //   validCode?: boolean;
  //   cohortSize?: number;
  //   seatsBooked?: number;
  //   seatsLeft?: number;
  //   viewStyle?: "mobile" | "desktop";
  //   soldOut?: boolean;
  //   registerBy?: Date | null;
  //   totalSold?: number;
  cta: string;
}
const FloatingFooter: React.FC<Props> = ({
  //   price,
  //   currency,
  onClick,
  leftText,
  link,
  appearance,
  //   validCode,
  //   soldOut,
  //   cohortSize,
  //   seatsBooked,
  //   viewStyle,
  //   totalSold,
  //   registerBy,
  //   seatsLeft,
  cta,
}) => {
  // console.log("cohortSize", cohortSize, seatsLeft);
  return (
    <div className="border-t rounded-t-lg shadow-2xl p-4 bg-white">
      <div className={clsx("")}>
        <div
          className={clsx(
            "flex ",
            leftText ? "justify-between " : "justify-center"
          )}
        >
          {leftText ? (
            <div className=" flex items-center md:pr-4 md:justify-end ">
              <p className="text-gray-700 text-2xl text-center md:text-right font-medium">
                {leftText}
              </p>
            </div>
          ) : null}
          <div className="w-1/2 ">
            {link ? (
              <Link href={link}>
                <Button
                  appearance={appearance ? appearance : "contained"}
                  onClick={onClick}
                  type="submit"
                >
                  <div>
                    <p
                      className={clsx(
                        "capitalize pt-1 pb-1 text-lg",
                        "font-semibold",

                        appearance === "contained" ? "" : "text-gray-700",
                        //   viewStyle === "mobile"
                        // ? "pl-4 pr-4"
                        // :
                        " pl-2 pr-2 "
                      )}
                    >
                      {cta}
                    </p>
                  </div>
                </Button>
              </Link>
            ) : (
              <Button
                appearance={appearance ? appearance : "contained"}
                onClick={onClick}
                type="submit"
              >
                <div>
                  <p
                    className={clsx(
                      "capitalize pt-1 pb-1 text-lg",
                      "font-semibold",

                      appearance === "contained" ? "" : "text-gray-700",
                      //   viewStyle === "mobile"
                      // ? "pl-4 pr-4"
                      // :
                      " pl-4 pr-4 "
                    )}
                  >
                    {cta}
                  </p>
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingFooter;
