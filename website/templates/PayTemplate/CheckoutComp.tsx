import { weEventTrack } from "@analytics/webengage/user/userLog";
import clsx from "clsx";
import Link from "next/link";
import { downIconWhite } from "@constants/icons/iconURLs";
import { gradients } from "@templates/OurPlans/VideoOverlay";
import { listCard } from "@templates/joinBoatTemplate/utils";
import { currency } from "@templates/OurPlans/Plan";
import { SbPlans } from "@models/SbPlans/interface";

interface Props {
  selectedPlan: SbPlans; // AppSubscription;
  durationInDays: number;
  currency: currency;
  isOpen: boolean;
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onPay: () => void;
  priceComp?: React.ReactNode;
}

const defaultGradient = "from-[#FF6C77] to-[#FFAB70]";

const CheckoutComp: React.FC<Props> = ({
  selectedPlan,
  durationInDays,
  currency,
  isOpen,
  handleOpen,
  onPay,
  priceComp,
  children,
}) => {
  // console.log(selectedPlan.name);

  // const duration = getPrefixSuffix(
  //   selectedPlan.durationInDays ? selectedPlan.durationInDays : 0
  // );

  return (
    <div className="w-full h-full bg-white/10 rounded-3xl overflow-hidden flex flex-col">
      <div className="flex justify-between items-center px-6 py-4">
        <h2 className="font-popL text-2xl">Checkout</h2>
        <Link
          href="https://api.whatsapp.com/send?phone=919958730020&text=Hi! I have a question with payment plans"
          passHref
        >
          <button
            onClick={() => weEventTrack("landingPage_clickWA", {})}
            className="font-popL px-4 py-2 bg-white/20 rounded-full text-xs text-white/80"
          >
            Need Help?
          </button>
        </Link>
      </div>

      <div className="border-y border-white/20 px-6 py-4">
        <div
          className={clsx(
            "flex bg-gradient-to-r rounded-xl text-white p-4",
            gradients[selectedPlan.durationInDays || durationInDays]
              ? gradients[selectedPlan.durationInDays || durationInDays]
              : defaultGradient
          )}
        >
          <div className="flex-1 flex justify-between items-center">
            <h3 className="font-popR iphoneX:text-base">{selectedPlan.name}</h3>
            {priceComp ? (
              priceComp
            ) : (
              <h3 className="font-popM text-base iphoneX:text-lg">{`${
                currency === "USD" ? "USD" : "INR"
              } ${
                currency === "INR"
                  ? parseFloat(selectedPlan.cost.toFixed(2))
                  : parseFloat(selectedPlan.usdCost.toFixed(2))
              }`}</h3>
            )}
          </div>

          {gradients[selectedPlan.durationInDays || durationInDays] ? (
            <img
              src={downIconWhite}
              onClick={handleOpen}
              className={clsx(
                "w-3 iphoneX:w-4 aspect-1 cursor-pointer transition-all object-contain ml-1 iphoneX:ml-2 relative z-0",
                isOpen ? "rotate-180" : "rotate-0"
              )}
              alt="drop down icon"
            />
          ) : null}
        </div>
        {children ? <div className="pt-4">{children}</div> : null}
      </div>

      <div className="flex-1 px-6 py-4 overflow-y-scroll scrollbar-hide">
        <h1 className="text-white font-popL text-lg">What i will get :</h1>
        <div className="w-full grid auto-cols-fr gap-8 py-4">
          {listCard.map((featureList, index) => {
            const keyToCheck = featureList.key;

            let isPresent: boolean = false;
            if (
              selectedPlan.offerings &&
              keyToCheck !== "isAccountabilityCoach" &&
              selectedPlan.offerings[keyToCheck]
            ) {
              isPresent = true;
            } else if (
              selectedPlan.benefits &&
              keyToCheck === "isAccountabilityCoach" &&
              selectedPlan.benefits[keyToCheck]
            ) {
              isPresent = true;
            }

            if (isPresent)
              return (
                <div
                  key={`${featureList.heading}-${index}`}
                  className="w-full flex items-center"
                >
                  <img
                    src={featureList?.iconUri}
                    className="w-1/5 aspect-1"
                    alt={featureList.heading}
                  />

                  <div className="w-5 iphoneX:w-8 aspect-1" />

                  <div className="flex-1 flex-col justify-center items-center">
                    <h6
                      className="text-xs iphoneX:text-sm font-popM"
                      style={{ color: featureList.textColor }}
                    >
                      {featureList.heading}
                    </h6>

                    <div>
                      {featureList.list.map((list, index) => (
                        <p
                          className="text-[10px] iphoneX:text-xs text-[#FFFFFFF2] font-popL"
                          key={index}
                        >
                          <span className="text-base iphoneX:text-lg">{`\u2022  `}</span>
                          {list}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>

      <button
        className={clsx(
          "font-popM bg-gradient-to-r rounded-full text-lg text-white py-2.5 mx-6 my-4",
          gradients[selectedPlan.durationInDays || durationInDays]
            ? gradients[selectedPlan.durationInDays || durationInDays]
            : defaultGradient
        )}
        onClick={onPay}
      >
        Pay Now
      </button>
    </div>
  );
};

export default CheckoutComp;
