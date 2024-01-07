import { impactStepsData } from "@templates/WomenTemplate/utils";
import FlameWaveBg from "../FlameWaveBg";
import JourneyStepper from "./JourneyStepper";

const ImpactSteps = () => {
  return (
    <div className="w-full h-screen relative z-0">
      <FlameWaveBg />
      <div className="w-full h-full max-w-screen-xl mx-auto flex flex-col items-center justify-center p-5 m-8">
        <JourneyStepper data={impactStepsData} />
      </div>
    </div>
  );
};

export default ImpactSteps;
