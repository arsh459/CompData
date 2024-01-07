import clsx from "clsx";
import React from "react";
import Button from "@components/button/index";
import Price from "../HeadingSection/Price";
import TopStrip from "./TopStrip";
import { Link } from "@mui/material";

interface Props {
  price?: number;
  currency?: "₹";
  onClick: () => void;
  validCode?: boolean;
  cohortSize?: number;
  seatsBooked?: number;
  seatsLeft?: number;
  viewStyle?: "mobile" | "desktop";
  soldOut?: boolean;
  registerBy?: Date | null;
  totalSold?: number;
  cta: string;
  noPrice?: boolean;
  link?: string;
}
const BookV2: React.FC<Props> = ({
  price,
  currency,
  onClick,
  validCode,
  soldOut,
  cohortSize,
  noPrice,
  seatsBooked,
  viewStyle,
  totalSold,
  registerBy,
  seatsLeft,
  cta,
  link,
}) => {
  // console.log("link", link);
  return (
    <div>
      <TopStrip registerBy={registerBy} />
      <div className={clsx("shadow-2xl flex justify-center p-4 bg-gray-100")}>
        <div className="pr-4 flex">
          {soldOut || (seatsLeft === 0 && totalSold) ? (
            <div className="w-full">
              <p className="text-xl font-medium text-center">Sold out!</p>
              <p className="text-xs font-medium text-center">
                You missed this one
              </p>
            </div>
          ) : validCode ? (
            <div>
              <p className="text-gray-700 font-medium">Free</p>
              <p className="text-xs text-gray-500">You&apos;re invited</p>
            </div>
          ) : !noPrice ? (
            <>
              <Price currency={currency} price={price} />
              {typeof cohortSize === "number" &&
              typeof seatsLeft === "number" ? (
                <p className="text-sm text-orange-500 font-medium">
                  {`${seatsLeft} spots left ${
                    totalSold ? `· ${totalSold} booked in past` : ""
                  }`}
                </p>
              ) : null}
            </>
          ) : null}
        </div>

        <div className="flex">
          {link ? (
            <Link href={link}>
              <Button appearance="contained" type="submit">
                <div>
                  <p
                    className={clsx(
                      "capitalize pt-1 pb-1",
                      "font-semibold",
                      viewStyle === "mobile"
                        ? "pl-4 pr-4"
                        : " pl-8 pr-8 sm:pl-12 sm:pr-12 "
                    )}
                  >
                    {cta}
                  </p>
                </div>
              </Button>
            </Link>
          ) : (
            <Button appearance="contained" onClick={onClick} type="submit">
              <div>
                <p
                  className={clsx(
                    "capitalize pt-1 pb-1",
                    "font-semibold",
                    viewStyle === "mobile"
                      ? "pl-4 pr-4"
                      : " pl-8 pr-8 sm:pl-12 sm:pr-12 "
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
  );
};

export default BookV2;
