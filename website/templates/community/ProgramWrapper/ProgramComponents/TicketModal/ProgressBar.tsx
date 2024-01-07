import { reviewStatus, reviewTicketStatus } from "@models/Activities/Activity";
import clsx from "clsx";
import { getStepText } from "./utils";

export type statusTypes = "done" | "pending" | "notDone";

const steps: { stepName: string; stepStatus: statusTypes }[] = [
  { stepName: "Sent", stepStatus: "done" },
  { stepName: "In Review", stepStatus: "done" },
  { stepName: "Revaluated", stepStatus: "notDone" },
];

const colors: { [key in statusTypes]: string } = {
  done: "#6EC576",
  pending: "#F19B38",
  notDone: "#A9B1A9",
};

interface Props {
  reviewStatus?: reviewTicketStatus;
  activityReviewStatus?: reviewStatus;
}

const ProgressBar: React.FC<Props> = ({
  reviewStatus,
  activityReviewStatus,
}) => {
  // console.log("reviewStatus", reviewStatus);
  // console.log("activityReviewStatus", activityReviewStatus);
  return (
    <div
      className="w-full p-12 pb-4 grid"
      style={{
        gridTemplateColumns: `repeat(${steps.length - 1}, 1fr) max-content`,
      }}
    >
      {steps.map((each, ind, arr) => {
        let status: statusTypes = "done";
        let stepText: string = each.stepName;
        let statusColor: statusTypes = each.stepStatus;
        if (each.stepName === "Revaluated" && reviewStatus === "PENDING") {
          status = "notDone";
        } else if (each.stepName === "Revaluated") {
          status = "done";
          const { text, color } = getStepText(activityReviewStatus);
          stepText = text;
          statusColor = color;
        }

        return (
          <div key={each.stepName} className="flex items-center">
            <div className="relative">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: colors[statusColor],
                }}
              />
              <p
                className={clsx(
                  status === "done" ? "font-bold" : "font-light",
                  "whitespace-pre absolute -top-2 left-0 -translate-x-1/2 -translate-y-full"
                )}
              >
                {stepText}
              </p>
            </div>
            {ind === arr.length - 1 ? null : (
              <div
                className="flex-1 mx-2 h-px"
                style={{
                  background: `linear-gradient(to right, ${colors[status]}, ${
                    colors[arr[ind + 1].stepStatus]
                  })`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
