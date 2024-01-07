import { popularCardLike } from "@constants/icons/iconURLs";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
// import { duration } from "@mui/material";
import clsx from "clsx";

interface Props {
  isPopular?: true;
  features?: string[];
  duration: string;
  amount: number;
  onClick: () => void;
  basePlanName: string;
  basePlanStatus?: subscriptionStatus;
}

const PlanCard: React.FC<Props> = ({
  isPopular,
  features,
  duration,
  amount,
  onClick,
  basePlanName,
  basePlanStatus,
}) => {
  const isSub = basePlanStatus === "PAID_ONE";
  // console.log("isSub", isSub);
  return (
    <div
      onClick={isSub ? () => {} : onClick}
      className={clsx(
        "cursor-pointer",
        "  min-h-[224px] iphoneX:min-w-[149px] w-full border rounded-xl border-gray-100 flex flex-col   ",
        isPopular ? "relative inset-0" : ""
      )}
      style={
        isPopular
          ? {
              background: `radial-gradient(103.17% 103.17% at 49.66% 97.29%, rgba(255, 85, 108, 0.53) 16.31%, rgba(255, 85, 126, 0.464435) 34.31%, rgba(255, 85, 146, 0.386975) 50.83%, rgba(16, 2, 4, 0) 99.58%)`,
            }
          : {}
      }
    >
      <div className=" flex-[0.3]">
        <p
          className={clsx(
            "text-[#FF697E] py-2 text-base font-semibold text-center",
            isSub ? "line-through" : ""
          )}
        >
          {isPopular ? "Add 30 Days" : basePlanName}
        </p>
        <p
          className={clsx(
            "text-[#FF697E] text-2xl font-bold text-center",
            isSub ? "line-through" : ""
          )}
        >
          INR {amount}
        </p>
      </div>
      <div className="flex-[0.6]">
        <ul>
          {features?.map((item) => {
            return (
              <li key={item} className="flex items-center  px-2">
                <div className="w-1 h-1 bg-gray-100 rounded-full " />

                <p className="text-[#F5F5F7] py-1 text-xs  font-normal pl-2 flex-1">
                  {item}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className=" flex-[0.1] border border-b-transparent border-l-transparent border-r-transparent border-t-[#F5F5F7] flex items-center justify-center py-2">
        <p className="text-[#F5F5F7] text-center text-xs">
          {isSub ? "Already Subscribed" : duration}
        </p>{" "}
      </div>
      {isPopular ? (
        <img
          src={popularCardLike}
          alt=""
          className="w-4 h-4 iphoneX:w-5 iphoneX:h-5 absolute top-0 right-2 translate-x-1/2  -translate-y-1/2"
        />
      ) : null}
    </div>
  );
};
export default PlanCard;
