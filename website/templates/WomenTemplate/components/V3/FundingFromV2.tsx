import { weEventTrack } from "@analytics/webengage/user/userLog";
import { FundingFromInterface } from "@templates/WomenTemplate/utils";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
interface Props {
  data: FundingFromInterface[];
  showRaised?: boolean;
  styleTw?: string;
}
const FundingFromV2: React.FC<Props> = ({ data, showRaised, styleTw }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (data) {
      const nextStepCount = () => (currentStep + 1) % data.length;
      const intervalId = setInterval(() => setCurrentStep(nextStepCount), 2000);

      return () => clearInterval(intervalId);
    }
  }, [data, currentStep]);

  const onPressClick = () => {
    weEventTrack("landing_clickPress", {});
  };

  return (
    <div
      className={clsx(
        "py-10 max-w-screen-xl mx-auto lg:py-20 my-10 lg:my-20  ",
        styleTw
      )}
    >
      <div className="p-4 pb-8">
        <h2 className="text-base text-[#EEE9FF] font-popR text-center ">
          Also Featured in
        </h2>
        {showRaised ? (
          <p className="text-white font-popM text-xl sm:text-2xl text-center pt-6">
            “Women-Focussed Fitness Firm SocialBoat Raises Funding.”
          </p>
        ) : null}
      </div>
      <div className="bg-black/10 my-0 mx-8 rounded-xl pt-4 lg:pt-0 overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row justify-center ">
          <div className="flex justify-center lg:justify-start items-center">
            {data?.slice(0, 3).map((item, index) => (
              <div
                key={`list0-${item.text}-${index}`}
                className="flex flex-row items-center"
              >
                <div className="w-[20vw] max-w-[110px] ">
                  <Link
                    href={item.link}
                    passHref
                    target="_blank"
                    className="w-full"
                  >
                    <img
                      src={item.media}
                      className={clsx(
                        "w-full aspect-[140/100] object-contain",
                        currentStep === index ? "opacity-100" : "opacity-30"
                      )}
                      alt={item.text}
                      onClick={onPressClick}
                    />
                  </Link>
                </div>
                {data ? (
                  <div
                    key={`separator0-${index}`}
                    className={clsx(
                      (data?.slice(3, 6)).length !== index
                        ? "w-[1vw] max-w-[3px] mx-[1vw] aspect-[1/8] bg-white/50 rounded-full"
                        : ""
                    )}
                  >
                    {/* {data?.slice(3, 6).length - 1}:length
                    {index}index */}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="flex justify-center lg:justify-start items-center">
            {data?.slice(3, 6).map((item, index) => (
              <div
                key={`list1-${item.text}-${index}`}
                className="flex flex-row items-center"
              >
                <div className="w-[20vw] max-w-[110px] ">
                  <Link
                    href={item.link}
                    passHref
                    target="_blank"
                    className="w-full"
                  >
                    <img
                      src={item.media}
                      className={clsx(
                        "w-full aspect-[140/100] object-contain",
                        currentStep === index + 3 ? "opacity-100" : "opacity-30"
                      )}
                      alt={item.text}
                      onClick={onPressClick}
                    />
                  </Link>
                </div>
                {data ? (
                  <div
                    key={`separator1-${index}`}
                    className={clsx(
                      (data?.slice(3, 6)).length - 1 !== index
                        ? "w-[1vw] max-w-[3px] mx-[1vw] aspect-[1/8] bg-white/50 rounded-full"
                        : ""
                    )}
                  >
                    {/* {data?.slice(3, 6).length - 1}:length
                    {index}index */}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="flex justify-center lg:justify-start items-center">
            {data?.slice(6).map((item, index) => (
              <div
                key={`list2-${item.text}`}
                className="flex flex-row items-center"
              >
                {data ? (
                  <div
                    key={`separator2-${index}`}
                    className={clsx(
                      (data?.slice(6)).length - 1 !== index
                        ? "w-[1vw] max-w-[3px] mx-[1vw] aspect-[1/8] bg-white/50 rounded-full"
                        : ""
                    )}
                  />
                ) : null}
                <div className="w-[20vw] max-w-[110px] ">
                  <Link
                    href={item.link}
                    passHref
                    target="_blank"
                    className="w-full"
                  >
                    <img
                      src={item.media}
                      className={clsx(
                        "w-full aspect-[140/100] object-contain",
                        currentStep === index + 6 ? "opacity-100" : "opacity-30"
                      )}
                      alt={item.text}
                      onClick={onPressClick}
                    />
                  </Link>
                </div>
                {data ? (
                  <div
                    key={`separator3-${index}`}
                    className={clsx(
                      (data?.slice(6)).length - 1 !== index
                        ? "w-[1vw] max-w-[3px] mx-[1vw] aspect-[1/8] bg-white/50 rounded-full"
                        : ""
                    )}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingFromV2;
