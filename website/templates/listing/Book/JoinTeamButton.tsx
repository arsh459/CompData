import clsx from "clsx";
import React from "react";
import Button from "@components/button/index";
import Loading from "@components/loading/Loading";
import TopStrip from "./TopStrip";

interface Props {
  // price?: number;
  // currency?: "₹";
  // onStartTeamClick: () => void;
  onClick: () => void;
  leftText?: string;
  //   rightText?: string;
  participating?: string;
  //   eventId: string;
  // validCode?: boolean;
  // cohortSize?: number;
  // seatsBooked?: number;
  // seatsLeft?: number;
  // viewStyle?: "mobile" | "desktop";
  loading?: boolean;
  text?: string;
  // totalSold?: number;
  // cta: string;
}
const JoinTeamButton: React.FC<Props> = ({
  // price,
  participating,
  leftText,
  //   rightText,
  onClick,
  loading,
  //   eventId,
  // validCode,
  // soldOut,
  // cohortSize,
  // seatsBooked,
  // viewStyle,
  // totalSold,
  text,
  // seatsLeft,
  // cta,
}) => {
  // console.log("cohortSize", cohortSize, seatsLeft);
  return (
    <div>
      {!participating && text ? <TopStrip text={text} /> : null}
      <div
        className={clsx(
          "shadow-2xl flex justify-center p-4 bg-gray-100 border-t"
        )}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        ) : leftText ? (
          <div className="w-full pr-2 max-w-[200px]">
            <Button onClick={onClick} appearance="contained" type="submit">
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
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default JoinTeamButton;
