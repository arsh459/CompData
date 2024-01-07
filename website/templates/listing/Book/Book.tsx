import clsx from "clsx";
import React from "react";
import Button from "@components/button/index";
import Price from "../HeadingSection/Price";

interface Props {
  price?: number;
  currency?: "₹";
  onClick: () => void;
  validCode?: boolean;
  cohortSize?: number;
  seatsBooked?: number;
  viewStyle?: "mobile" | "desktop";
  soldOut?: boolean;
  registerBy?: Date | null;
}
const Book: React.FC<Props> = ({
  price,
  currency,
  onClick,
  validCode,
  soldOut,
  cohortSize,
  seatsBooked,
  viewStyle,
  registerBy,
}) => {
  return (
    <div>
      {registerBy ? (
        <div className="bg-orange-500 p-1 flex justify-center">
          <p className="text-gray-100 text-xs pr-1">Deadline to register:</p>
          <p className="text-gray-50 text-xs font-bold">
            {registerBy.toLocaleDateString("default", {
              month: "short",
              day: "2-digit",
              hour: "numeric",
              weekday: "short",
              hour12: true,
              minute: "2-digit",
            })}
          </p>
        </div>
      ) : null}
      <div className={clsx("shadow-2xl flex p-4 bg-gray-100")}>
        <div className="pr-4 flex-1">
          {soldOut ? (
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
          ) : (
            <>
              <Price currency={currency} price={price} />
              {typeof cohortSize === "number" &&
              typeof seatsBooked === "number" ? (
                <p className="text-sm text-orange-500 font-medium">
                  {cohortSize - seatsBooked} spots left
                </p>
              ) : null}
            </>
          )}
        </div>

        {!soldOut ? (
          <div className="flex">
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
                  {validCode ? "Join the boat" : "Reserve"}
                </p>
              </div>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Book;
