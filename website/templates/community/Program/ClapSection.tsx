import { Activity } from "@models/Activities/Activity";
import clsx from "clsx";
import { format } from "date-fns";

interface Props {
  numClaps?: number;
  numCheckins?: number;
  checkinClick: () => void;
  onClapClick: () => void;
  onReviewClick: () => void;
  isAdmin?: boolean;
  adminReview?: Activity[];
  setSelectedReview: (newRev: Activity | undefined) => void;
  fitPoints?: number;
}

const ClapSection: React.FC<Props> = ({
  numClaps,
  numCheckins,
  checkinClick,
  onClapClick,
  onReviewClick,
  isAdmin,
  adminReview,
  setSelectedReview,
  fitPoints,
}) => {
  const onReviewSelect = (newRev?: Activity) => {
    onReviewClick();
    setSelectedReview(newRev);
  };

  // console.log("is", isAdmin);

  return (
    <>
      <div className="flex items-center">
        <div>
          {numClaps ? (
            <div className="flex cursor-pointer" onClick={onClapClick}>
              <p className="text-gray-700 font-medium  text-sm pr-1">
                {numClaps}
              </p>
              <p
                className={clsx(
                  "text-gray-500 text-sm",
                  numClaps ? "underline" : ""
                )}
              >
                clap(s)
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-xs">Be first to clap</p>
          )}
        </div>
        <div className="">
          {numCheckins ? (
            <div className="flex cursor-pointer pl-2" onClick={checkinClick}>
              <p className="text-gray-700 font-medium text-sm pr-1">
                {numCheckins}
              </p>
              <p
                className={clsx(
                  "text-gray-500 text-sm",
                  numClaps ? "underline" : ""
                )}
              >
                reply(s)
              </p>
            </div>
          ) : (
            <div />
          )}
        </div>
        {isAdmin ? (
          <div className="pl-2">
            {adminReview &&
              adminReview.map((review, index) => {
                return (
                  <div
                    key={`rev-${index}`}
                    onClick={() => onReviewSelect(review)}
                    className="cursor-pointer"
                  >
                    <p className={clsx("text-orange-500 text-sm")}>
                      {`cals:${review.calories} Dt:${
                        review.createdOn
                          ? format(new Date(review.createdOn), "dd/MM/yyyy")
                          : "Not set"
                      }`}
                    </p>
                  </div>
                );
              })}

            <div onClick={() => onReviewSelect()} className="cursor-pointer">
              <p className={clsx("text-green-500 font-semibold text-sm")}>
                Review
              </p>
            </div>
          </div>
        ) : null}
        {fitPoints && fitPoints > 0 ? (
          <p className={clsx("text-orange-500 text-sm text-right pl-2")}>
            Counted 💪
          </p>
        ) : null}
      </div>
    </>
  );
};

export default ClapSection;
