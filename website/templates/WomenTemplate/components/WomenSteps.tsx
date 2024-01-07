import React from "react";
import FiveMinuteTasks from "./FiveMinuteTasks/FiveMinuteTasks";
import GenericStep from "./GenericStep";
import ShareEngage from "./ShareEngage/ShareEngage";
import StepOneWomen from "./StepOneWomen";
import StepThreeWomen from "./StepThreeWomen";
import StepTwoWomen from "./StepTwoWomen";

const WomenSteps = () => {
  const helperFunc = () => {
    document
      .getElementById("how_it_work")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        className="w-full mt-40 mb-80 flex flex-col justify-center items-center cursor-pointer"
        onClick={helperFunc}
      >
        <p className="font-popR text-4xl md:text-5xl">How it Works</p>
        <div className="flex justify-center items-center py-6">
          <div className="w-2 md:w-3 aspect-1 rounded-full bg-white mx-8 md:mx-10" />
          <div className="w-2 md:w-3 aspect-1 rounded-full bg-white mx-8 md:mx-10" />
          <div className="w-2 md:w-3 aspect-1 rounded-full bg-white mx-8 md:mx-10" />
        </div>
      </div>

      <div id="how_it_work">
        <GenericStep
          leftChild={<StepOneWomen />}
          rightChild={<FiveMinuteTasks />}
        />
      </div>

      <GenericStep
        leftChild={<StepTwoWomen />}
        rightChild={
          <div className="md:pb-4 flex flex-1 flex-grow justify-center items-center">
            <img
              src={
                "https://ik.imagekit.io/socialboat/tr:w-800,c-maintain_ratio,fo-auto/Group_866__1__HMqS-DFQl.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668103297647"
              }
              className="object-contain px-4 w-3/4 max-w-[600px] mx-auto"
              loading="lazy"
            />
          </div>
        }
      />

      <GenericStep
        leftChild={<StepThreeWomen />}
        rightChild={<ShareEngage />}
      />
    </>
  );
};

export default WomenSteps;
