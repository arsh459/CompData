import clsx from "clsx";
import React from "react";
import Button from "@components/button/index";
import { Link } from "@mui/material";
import TopStrip from "./TopStrip";

interface Props {
  // price?: number;
  // currency?: "₹";
  // onStartTeamClick: () => void;
  onClick: () => void;
  leftText?: string;
  rightText?: string;
  // participating?: string;
  eventId: string;
  isFinished?: boolean;
  // validCode?: boolean;
  // cohortSize?: number;
  // seatsBooked?: number;
  // seatsLeft?: number;
  // viewStyle?: "mobile" | "desktop";
  // soldOut?: boolean;
  registerBy?: number;
  // totalSold?: number;
  // cta: string;
}
const ChallengeBook: React.FC<Props> = ({
  // price,
  // participating,
  leftText,
  rightText,
  onClick,
  eventId,
  isFinished,
  // validCode,
  // soldOut,
  // cohortSize,
  // seatsBooked,
  // viewStyle,
  // totalSold,
  registerBy,
  // seatsLeft,
  // cta,
}) => {
  // console.log("cohortSize", cohortSize, seatsLeft);
  return (
    <div>
      {registerBy && !isFinished ? (
        <TopStrip registerBy={new Date(registerBy)} />
      ) : null}

      {isFinished ? <TopStrip text={"Program has ended"} /> : null}
      <div
        className={clsx(
          "shadow-2xl flex justify-center p-4 bg-gray-100 border-t"
        )}
      >
        {/* <div className="pr-4 flex-1">
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
          ) : (
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
          )}
        </div> */}
        {!isFinished && leftText ? (
          <div className="w-full pr-2 max-w-[200px]">
            <Link href={`/join?eventId=${eventId}&nav=program`}>
              <Button appearance="contained" type="submit">
                <div>
                  <p
                    className={clsx(
                      "capitalize pt-1 pb-1",
                      "font-semibold"

                      // viewStyle === "mobile"
                      // ? "pl-4 pr-4"
                      // : " pl-8 pr-8 sm:pl-12 sm:pr-12 "
                    )}
                  >
                    {leftText}
                  </p>
                </div>
              </Button>
            </Link>
          </div>
        ) : null}

        {isFinished ? (
          <div className="w-full max-w-[200px] pl-2">
            <Link href="https://calendly.com/socialboat/consultation?month=2021-12&date=2021-12-15">
              <Button
                appearance="contained"
                // onClick={onStartTeamClick}
                type="submit"
              >
                <div className="">
                  <p className={clsx("capitalize pt-1 pb-1", "font-semibold")}>
                    Contact us
                  </p>
                </div>
              </Button>
            </Link>
          </div>
        ) : null}

        {!isFinished && rightText ? (
          <div className="w-full max-w-[200px] pl-2">
            <Button appearance="control" onClick={onClick} type="submit">
              <div>
                <p
                  className={clsx(
                    "capitalize pt-1 pb-1",
                    "font-semibold",
                    "text-gray-700"
                    // viewStyle === "mobile"
                    // ? "pl-4 pr-4"
                    // : " pl-8 pr-8 sm:pl-12 sm:pr-12 "
                  )}
                >
                  {rightText}
                </p>
              </div>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChallengeBook;
