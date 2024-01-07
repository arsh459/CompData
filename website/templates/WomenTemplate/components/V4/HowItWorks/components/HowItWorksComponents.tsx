import * as React from "react";
import BodyParameter from "./BodyParameter";
import { howItWorksDataV2Data } from "../data/data";
import HowItWorksHeading from "./HowItWorksHeading";

const HowItWorksComponents = () => {
  return (
    <div className="h-full w-full md:px-24 px-2">
      {<HowItWorksHeading />}
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-2 grid-rows-3 gap-4 px-5">
        {howItWorksDataV2Data.map((item, index) => {
          return <BodyParameter key={index} item={item} index={index} />;
        })}
      </div>
    </div>
  );
};

export default HowItWorksComponents;
