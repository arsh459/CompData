// import { Divider } from "@mui/material";
// import { LocalCohort } from "@models/Event/Event";
import { Link } from "@mui/material";
import clsx from "clsx";

interface Props {
  //   cohort?: LocalCohort;
  //   buttonPlacement: "right" | "bottom" | "responsive";
  onClick: () => void;
  // price: number;
  link?: string;
  cta: string;
  //   keyWord: string;
  seatsLeft: number;
}

export const BookingButton: React.FC<Props> = ({
  //   cohort,
  onClick,
  link,
  seatsLeft,
  //   buttonPlacement,
  //   link,
  // price,
  // totalSold,
  cta,
  //   keyWord,
}) => {
  //   const seatsLeft = cohort ? cohort.cohortSize - cohort.seatsBooked : -1;
  //   const seatsLeft = 0;

  return (
    <>
      {link ? (
        <Link href={link}>
          <button
            type="button"
            // onClick={onClick}
            className={clsx(
              seatsLeft === 0
                ? "bg-gray-300 hover:bg-gray-300"
                : "cursor-pointer bg-orange-500 hover:bg-orange-500 hover:shadow-xl",
              "rounded-md shadow-md px-3 py-2",
              "w-full"
            )}
          >
            <p
              className={clsx(
                seatsLeft === 0 ? "text-gray-700" : "text-white",
                "capitalize text-sm font-semibold text-center"
              )}
            >
              {cta}
            </p>
          </button>
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={clsx(
            seatsLeft === 0
              ? "bg-gray-300 hover:bg-gray-300"
              : "cursor-pointer bg-orange-500 hover:bg-orange-500 hover:shadow-xl",
            "rounded-md shadow-md px-3 py-2",
            "w-full"
          )}
        >
          <p
            className={clsx(
              seatsLeft === 0 ? "text-gray-700" : "text-white",
              "capitalize text-sm font-semibold text-center"
            )}
          >
            {cta}
          </p>
        </button>
      )}
    </>
  );
};

export default BookingButton;
