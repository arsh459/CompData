import HowToParticipateStepsComp from "./HowToParticipateStepsComp";
import { BenefitInterface } from "@models/Event/Round";

interface Props {
  route: string;
  btnText: string;
  steps?: BenefitInterface[];
}

const HowToParticipateSteps: React.FC<Props> = ({ route, btnText, steps }) => {
  return (
    <div className="w-screen min-h-screen max-w-screen-xl mx-auto relative z-0 ">
      {steps?.map((each, index) => (
        <HowToParticipateStepsComp
          route={route}
          btnText={btnText}
          key={`Step ${index + 1}`}
          each={each}
          index={index}
        />
      ))}
    </div>
  );
};

export default HowToParticipateSteps;
