import { StepsDataInterface } from "@templates/WomenTemplate/utils";
import { useState, useEffect } from "react";
import clsx from "clsx";

interface Props {
  data: StepsDataInterface[];
}
const JourneyStepper: React.FC<Props> = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentStep((currentStep + 1) % data.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [currentStep, data]);

  return (
    <>
      <h2 className="text-xl sm:text-xl lg:text-3xl font-popL pb-8 w-full text-center m-4">
        How the PCOD treatment works?
      </h2>
      <div
        className={clsx(
          "w-full lg:w-4/5 flex flex-col lg:flex-row items-center p-5 lg:p-8 gap-5 lg:gap-8 font-popL",
          "bg-gradient-to-br from-[#B684F5B2] to-[#553CA8B2] rounded-3xl backdrop-blur-[137px]"
        )}
      >
        <img
          src={data[currentStep].media}
          alt={data[currentStep].title}
          className="w-full lg:w-1/2 h-full aspect-1 object-contain rounded-3xl"
        />

        <div
          key={data[currentStep].title}
          className={clsx(
            "py-6 px-4 w-full lg:hidden block",
            "bg-[#00000026] rounded-[20px]"
          )}
        >
          <p className={`text-base pb-2`}>{`Step ${currentStep + 1}: ${
            data[currentStep].title
          }`}</p>
          <p className={`text-xs text-[#FFFFFF99] line-clamp-2`}>
            {data[currentStep].description}
          </p>
        </div>

        <div className="w-1/2 hidden lg:flex flex-row lg:flex-col py-5">
          {data.map((item, index) => (
            <div
              key={`${item.title}_${index}`}
              className={clsx(
                "py-6 px-4 relative z-0 flex items-start",
                currentStep === index && "bg-[#00000026] rounded-[20px]"
              )}
            >
              <div className="flex-1">
                <h4
                  className="text-base pb-2"
                  onClick={() => setCurrentStep(index)}
                >
                  {`Step ${index + 1}: ${item.title}`}
                </h4>
                <p className={`text-xs text-[#FFFFFF99]`}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JourneyStepper;
