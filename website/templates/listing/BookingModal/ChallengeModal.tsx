// import Button from "@components/button";
import Button from "@components/button";
import { Link } from "@mui/material";
import clsx from "clsx";
import Price from "../HeadingSection/Price";
// import CohortElement from "./CohortElement";

interface Props {
  cost: number;
  currency?: string;
  // numSeatsLeft: number;
  registerBy?: number | null;
  isFinished?: boolean;

  //   onClick: (newId: string) => void;
  // validCode?: boolean;
  eventId: string;
  onStartTeamClick: () => void;
  leftText: string;
  rightText?: string;
  rightOnClick: () => void;
  // participating?: string;
  //   cohorts: LocalCohort[];
  //   cta: string;
  //   keyWord: string;
  // name: string;
}

const ChallengeModal: React.FC<Props> = ({
  currency,
  cost,
  registerBy,
  // onStartTeamClick,
  leftText,
  rightOnClick,
  rightText,
  // participating,
  eventId,
  isFinished,
  // numSeatsLeft,
  //   registrationsClose,
  //   cohorts,
  //   onClick,
  // validCode,
  // cohortSize,
  // seatsBooked,
  //   keyWord,
  //   cta,
  // name,
}) => {
  // console.log("registerBy", registerBy);
  return (
    <div className="shadow-xl hover:shadow-2xl w-full max-w-xs p-4 border rounded-lg">
      {cost ? (
        <div className="flex items-center">
          {currency && cost ? <Price currency={currency} price={cost} /> : null}
          <p className="pl-1 text-gray-500">/ person</p>
        </div>
      ) : (
        <p className="text-xl text-gray-500">Free</p>
      )}

      <div>
        <div>
          {isFinished ? (
            <p className="text-orange-500 text-sm font-medium">
              Challenge has finished
            </p>
          ) : registerBy ? (
            <div>
              <p className="text-orange-500 text-sm font-medium">
                Starts:{" "}
                {new Date(registerBy).toLocaleDateString("default", {
                  month: "short",
                  day: "2-digit",
                  hour: "numeric",
                  hour12: true,
                  minute: "2-digit",
                })}
              </p>
            </div>
          ) : null}
        </div>

        {isFinished ? (
          <div className="pt-4">
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

        {!isFinished && leftText ? (
          <div className="pt-4">
            <Link href={`/join?eventId=${eventId}&nav=program`}>
              <Button
                appearance="contained"
                // onClick={onStartTeamClick}
                type="submit"
              >
                <div className="">
                  <p className={clsx("capitalize pt-1 pb-1", "font-semibold")}>
                    {leftText}
                  </p>
                </div>
              </Button>
            </Link>
          </div>
        ) : null}

        {!isFinished && rightText ? (
          <div className="pt-2">
            <Button appearance="outline" onClick={rightOnClick} type="submit">
              <div>
                <p
                  className={clsx(
                    "capitalize pt-1 pb-1",
                    "font-semibold",
                    "text-gray-700"
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

export default ChallengeModal;
