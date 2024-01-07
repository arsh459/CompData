import { weEventTrack } from "@analytics/webengage/user/userLog";
import { FundingFromInterface } from "@templates/WomenTemplate/utils";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

const chunkSize = 3;
interface Props {
  data: FundingFromInterface[];
}
const FundingFrom: React.FC<Props> = ({ data }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentStepId, setCurrentStepId] = useState<string>("data-chunk-0-0");

  useEffect(() => {
    if (data) {
      const nextStepCount = () => {
        const nextInd = (currentStep + 1) % data.length;
        setCurrentStepId(
          `data-chunk-${Math.floor(nextInd / chunkSize)}-${nextInd % chunkSize}`
        );
        return nextInd;
      };
      const intervalId = setInterval(() => setCurrentStep(nextStepCount), 2000);

      return () => clearInterval(intervalId);
    }
  }, [data, currentStep]);

  const onPressClick = () => {
    weEventTrack("landing_clickPress", {});
  };

  return (
    <div className="py-10 lg:py-20 my-10 lg:my-20 px-8">
      <h2 className="ext-2xl sm:text-3xl lg:text-4xl text-white font-qsSB text-center p-4 pb-8">
        Press Coverage
      </h2>
      <div className="bg-[#FFFFFF0F] py-4 lg:py-10 my-0 px-8 rounded-xl">
        <p className="text-sm lg:text-2xl font-popL text-center text-white/60">
          &quot;{data[currentStep].text}&quot;
        </p>
        <div className="w-full max-w-screen-xl mx-auto flex flex-wrap justify-center pt-8">
          {Array.from({ length: Math.ceil(data.length / chunkSize) }, (_, i) =>
            data.slice(i * chunkSize, i * chunkSize + chunkSize)
          ).map((chunk, ind) => (
            <div
              key={`data-chunk-${ind}`}
              className="flex justify-center lg:justify-end items-center"
            >
              {chunk.map((item, index) => (
                <div
                  key={`data-chunk-${ind}-${index}`}
                  className="flex flex-row items-center"
                >
                  <div className="w-[20vw] max-w-[150px]">
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
                          currentStepId === `data-chunk-${ind}-${index}`
                            ? "opacity-100"
                            : "opacity-30"
                        )}
                        alt={item.text}
                        onClick={onPressClick}
                      />
                    </Link>
                  </div>
                  {ind * chunkSize + index !== data.length - 1 ? (
                    <div
                      className={clsx(
                        index !== chunk.length - 1
                          ? "w-[1vw] max-w-[5px] mx-4 lg:mx-8"
                          : "lg:w-[1vw] lg:max-w-[5px] lg:mx-8",
                        "aspect-[1/12] bg-white/50 rounded-full"
                      )}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundingFrom;
