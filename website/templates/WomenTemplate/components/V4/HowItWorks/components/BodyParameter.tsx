import * as React from "react";
import { howItWorksDataV2Interface } from "../data/data";
import StepCount from "./StepComps/StepCount";
import StepHeading from "./StepComps/StepHeading";
import StepImage from "./StepComps/StepImage";
interface Props {
  item: howItWorksDataV2Interface;
  index: number;
}
const BodyParameter: React.FC<Props> = ({ item, index }) => {
  return (
    <div
      className={`${
        item.stepContent
          ? " lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:place-items-start lg:pt-16 flex flex-col justify-between"
          : "flex flex-col justify-between"
      } border border-white/20 rounded-3xl pt-10 px-7 ${
        item.stepContent && "lg:col-span-2"
      } lg:max-h-[34rem]`}
      style={{
        background: item.backgroundGradient,
      }}
    >
      <div className="flex items-start lg:mb-0 mb-6">
        <StepCount index={index} />
        <StepHeading index={index} />
      </div>

      <StepImage index={index} />
    </div>
  );
};
export default BodyParameter;
