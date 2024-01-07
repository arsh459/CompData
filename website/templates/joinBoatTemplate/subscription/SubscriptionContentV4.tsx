// import { useState } from "react";
import { Link } from "@mui/material";
import clsx from "clsx";
// import {
//   fitChallenges,
//   freeTriaCalender,
//   moneyBagWhite,
// } from "@constants/icons/iconURLs";
import PlanCard from "./PlanCard";
// import PlanDetails from "./PlanDetails";
import { basicPlanDetails } from "@hooks/subscription/useSubscriptionV2";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
import Loading from "@components/loading/Loading";
// import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// const whatWillYouGet = [
//   {
//     icon: freeTriaCalender,
//     text: "3 Day Free Trial",
//   },
//   {
//     icon: moneyBagWhite,
//     text: "Win your money back and rewards upto INR 1,00,000/month",
//   },
//   {
//     icon: fitChallenges,
//     text: "Access to all 1000+ fitness challenges & programs in SB",
//   },
// ];
const subscriptionFeatures = [
  "3 Day Free Trial",
  "Unlimited access to all games",
  "Rewards > ₹1,00,000",
];

interface Props {
  onSinglePayRequest: () => void;
  onSubscribe: () => Promise<void>;
  onClose?: () => void;
  cost: number;
  subscriptionDuration: string;
  // singlePlanDuration: string;
  // singlePlanCost: number;
  // singlePlanFeatures: string[];

  basicPlan?: basicPlanDetails;
  basePlanStatus: subscriptionStatus;

  // moneyBackDays?: number;
  // freeAccessDays?: number;
  // topMedia?: AWSMedia | CloudinaryMedia;
  // topThumbnail?: AWSMedia | CloudinaryMedia;
  topText: string;
  loading: boolean;
  // programDetails: string[];
  // gameName: string;
}
const SubscriptionContentV4: React.FC<Props> = ({
  onSubscribe,
  loading,
  // programDetails,
  topText,
  cost,
  subscriptionDuration,
  // singlePlanDuration,
  // singlePlanFeatures,
  // singlePlanCost,
  basicPlan,
  basePlanStatus,
  // freeAccessDays,
  // moneyBackDays,
  onClose,
  // topMedia,
  // topThumbnail,
  onSinglePayRequest,
  // gameName,
}) => {
  // const [isClicked, setIsClicked] = useState(basicPlan ? false : true);

  // const features = [`Access to ${gameName} game`, "Lorem ipsum advinct"];
  // console.log("basePlanStatus", basePlanStatus);

  return (
    <div className="w-full h-full overflow-hidden bg-black flex flex-col relative">
      {loading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full h-full flex justify-center items-center  bg-smoke-400">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : null}
      <div
        className="flex-1 bg-no-repeat"
        style={{
          backgroundImage: `url(https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio/Screenshot_2022-07-25_at_2.01_1__1__BZFt09JHN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658838777384)`,

          backgroundSize: "contain",
        }}
      >
        <div
          className="absolute left-0 right-0  top-0 flex items-center p-2 iphoneX:p-4 justify-between z-40 max-w-md mx-auto"
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0.53) 1.79%, rgba(0, 0, 0, 0.21) 58.04%, rgba(0, 0, 0, 0) 100%)`,
          }}
        >
          <div className="cursor-pointer" onClick={onClose}>
            <img
              src={
                "https://ik.imagekit.io/socialboat/Vector__16__TCdE80hiL.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658907677488"
              }
              className="w-2 h-4 iphoneX:w-3 iphoneX:h-7"
            />
          </div>

          <Link
            href={"https://api.whatsapp.com/send?phone=919958730020&text=Hi!"}
          >
            <div className="w-20 h-6  iphoneX:w-24 iphoneX:h-8 flex items-center justify-center backdrop-blur-[11px] border rounded-full border-[#D1D1D1] ">
              <img
                src={
                  "https://ik.imagekit.io/socialboat/Vector__3__VvwOQQYVf.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1657004613434"
                }
                alt="help message"
              />
              <span className="text-xs iphoneX:text-sm font-semibold text-[#D1D1D1] pl-1 ">
                HELP
              </span>
            </div>
          </Link>
        </div>
        <div
          className={clsx(
            "flex-1 bg-[#100F1AB8] backdrop-blur-[4px] rounded-3xl rounded-b-none absolute bottom-0 left-0 right-0",
            "transform-all duration-100 ",
            // isClicked
            // ? "h-[80vh] overflow-y-scroll "
            // :
            "max-h-3/4 overflow-y-scroll"
          )}
        >
          <div className="flex flex-col justify-around flex-1 p-4">
            {/* <div className="text-center  mx-auto mt-2">
              {isClicked && (
                <img
                  onClick={() => setIsClicked((prev) => !prev)}
                  src={
                    "https://ik.imagekit.io/socialboat/Rectangle_1022__1__D4UtCL7j3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658908964012"
                  }
                  className={clsx(
                    "w-11 h-3  mx-auto mt-4",
                    !isClicked ? "animate-pulse " : ""
                  )}
                  alt=""
                />
              )}
            </div> */}
            <div
              className="text-[#FF5970] text-2xl iphoneX:text-4xl font-semibold"
              //</div> </div></div>className="text-[#FF5970] text-2xl iphoneX:text-[40px] py-5 iphoneX:py-8 font-semibold leading-10"
            >
              {topText}
            </div>
            {/* {!isClicked ? ( */}
            <p className="text-[#F5F5F7] text-xl iphoneX:text-2xl pt-6">
              Choose Your Plan
            </p>
            {/* ) : ( */}
            {/* <p /> */}
            {/* )} */}
            {/* {!isClicked ? ( */}
            <div className="flex items-center justify-between pt-4">
              {basicPlan ? (
                <>
                  <PlanCard
                    basePlanStatus={basePlanStatus}
                    features={basicPlan.pointers}
                    basePlanName={`${basicPlan.durationInDays} Day Plan`}
                    duration={`${basicPlan.durationInDays} Days`}
                    amount={basicPlan.cost}
                    onClick={onSinglePayRequest}
                  />
                  <span className="text-white iphoneX:text-lg font-semibold text-center mx-2">
                    or
                  </span>
                </>
              ) : null}

              <PlanCard
                basePlanName={`${basicPlan?.durationInDays} Day Plan`}
                isPopular={true}
                features={subscriptionFeatures}
                duration={subscriptionDuration}
                amount={cost}
                onClick={onSubscribe}
              />
            </div>
            {/* ) : null} */}
            {/* {isClicked ? (
              <PlanDetails
                isClicked={isClicked}
                onSubscribe={onSubscribe}
                whatWillYouGet={whatWillYouGet}
              />
            ) : null} */}
          </div>
          {/* Choose Plan */}
          {/* {isClicked ? (
            <div
              className=" bg-[#FF556C] text-white py-2 iphoneX:py-4
sticky   bottom-4         
          border rounded-full text-center mx-3 text-sm iphoneX:text-base font-medium "
              onClick={onSubscribe}
            >
              {`Start Free & Subscribe Now!`}
            </div>
          ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionContentV4;
