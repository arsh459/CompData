// import {
// baseImageKit,
// calendarIcon,
//   lockIcon,
// } from "@constants/icons/iconURLs";
// import { userTaskStatus } from "@hooks/tasks/access/useIsTaskAllowed";
// import { taskFrequency } from "@models/Tasks/Task";
// import { style } from "@mui/system";
// import { taskFrequency } from "@models/Tasks/Task";
import clsx from "clsx";
// import FrequencyElement from "./FrquencyElement";
// import { format } from "date-fns";

interface Props {
  earnedFp: number;
  totalFp: number;
  overlay?: boolean;
  doneBy?: string;
  isNotComplete?: boolean;
}

const CompletedKPI: React.FC<Props> = ({
  earnedFp,

  overlay,
  doneBy,
  isNotComplete,
  totalFp,
}) => {
  return (
    <>
      <div
        className={clsx(
          "w-full flex flex-col items-center justify-end h-full  absolute   rounded-b-2xl inset-0 pb-2 px-4 z-50 rounded-2xl",
          overlay && !isNotComplete
            ? "bg-gradient-to-t from-[#6EC576] to-[#36613AA8]"
            : overlay && isNotComplete
            ? "bg-gradient-to-t from-yellow-500 to-yellow-800"
            : ""
        )}
        // style={{
        //   background: overlay
        //     ? `linear-gradient(180deg, rgba(0, 0, 0, 0.32) 0%, rgba(54, 97, 58, 0.66) 18.47%, #6EC576 94.83%)`
        //     : "",
        // }}
      >
        <div className="absolute inset-0 justify-center items-center flex z-50">
          <p className="text-lg font-semibold tracking-wide text-center text-white">
            Score {earnedFp}/{totalFp} FP
          </p>
        </div>

        <div className="flex items-center w-full justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 pr-1"
            viewBox="0 0 20 20"
            fill="#fff"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>

          <p className="text-xs iphoneX:text-sm my-1 line-clamp-1  font-medium whitespace-nowrap text-white flex-1">
            {doneBy ? `${doneBy}` : "Task completed"}
          </p>
        </div>
      </div>
    </>
  );
};

export default CompletedKPI;
