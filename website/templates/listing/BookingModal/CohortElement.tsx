import { Divider } from "@mui/material";
import { LocalCohort } from "@models/Event/Event";
import clsx from "clsx";
import BookingButton from "./BookingButton";

interface Props {
  cohort?: LocalCohort;
  buttonPlacement: "right" | "bottom" | "responsive";
  onClick: () => void;
  // price: number;
  link?: string;
  cta: string;
  keyWord: string;
}

export const CohortElement: React.FC<Props> = ({
  cohort,
  onClick,
  buttonPlacement,
  link,
  // price,
  // totalSold,
  cta,
  keyWord,
}) => {
  const seatsLeft = cohort ? cohort.cohortSize - cohort.seatsBooked : -1;
  //   const seatsLeft = 0;

  return (
    <div>
      <div className="flex justify-between">
        <div>
          {cohort && cohort.cohortStarts ? (
            <div>
              <p className="text-gray-700 font-semibold text-base">
                {cohort.cohortStarts?.toLocaleDateString("default", {
                  month: "short",
                  day: "2-digit",
                  weekday: "short",
                })}
              </p>
            </div>
          ) : null}
          {cohort && cohort.registerBy ? (
            <div>
              <p className="text-orange-500 text-sm font-medium">
                Deadline:{" "}
                {cohort &&
                  cohort.registerBy.toLocaleDateString("default", {
                    month: "short",
                    day: "2-digit",
                    hour: "numeric",
                    hour12: true,
                    minute: "2-digit",
                  })}
              </p>
            </div>
          ) : null}
          {cohort && cohort.seatsBooked === 0 ? (
            <p className="text-gray-500 text-sm">
              {keyWord} size: {cohort.cohortSize} person(s)
            </p>
          ) : cohort && seatsLeft > 0 ? (
            <p className="text-gray-500 text-sm">
              {seatsLeft} of {cohort.cohortSize} seats available
            </p>
          ) : cohort ? (
            <p className="text-gray-500 text-sm">
              All {cohort.cohortSize} seats reserved
            </p>
          ) : keyWord ? (
            <p className="text-orange-500 text-base">
              {keyWord} size: 5 person(s)
            </p>
          ) : null}
        </div>

        <div
          className={clsx(
            buttonPlacement === "responsive"
              ? "hidden lg:block"
              : buttonPlacement === "bottom"
              ? "hidden"
              : ""
          )}
        >
          <BookingButton
            onClick={onClick}
            link={link}
            cta={cta}
            seatsLeft={seatsLeft}
          />
        </div>
      </div>

      <div
        className={clsx(
          "pt-4",
          buttonPlacement === "responsive"
            ? "lg:hidden"
            : buttonPlacement === "right"
            ? "hidden"
            : ""
        )}
      >
        <BookingButton
          onClick={onClick}
          link={link}
          cta={cta}
          seatsLeft={seatsLeft}
        />
      </div>

      <div className="pt-4">
        <Divider />
      </div>
    </div>
  );
};

export default CohortElement;
