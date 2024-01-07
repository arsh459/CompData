import clsx from "clsx";
import StepsComp from "./StepsComp";
import { BenefitInterface } from "@models/Event/Round";

interface Props {
  each: BenefitInterface;
  index: number;
  route: string;
  btnText: string;
}

const bgURL =
  "https://ik.imagekit.io/socialboat/Group%201000001261_YZxafFBwI.png?updatedAt=1697189682428";

const HowToParticipateStepsComp: React.FC<Props> = ({
  each,
  index,
  route,
  btnText,
}) => {
  return (
    <div className="w-full sm:w-[70%] lg:w-5/6 sm:h-max mx-auto px-4 flex flex-col  justify-center xs:mb-15 lg:mb-24 sm:mt-24">
      <h2
        aria-hidden={index !== 0}
        className={clsx(
          "font-pJSSB text-center xs:text-[28px] sm:text-4xl lg:text-5xl",
          "bg-clip-text text-[#DCCBFF]",
          "w-full xs:px-2 sm:px-4 xs:mb-2 sm:mb-8 lg:mb-16 py-2",
          index === 0 ? "block opacity-100" : "hidden opacity-0"
        )}
      >
        How To Participate
      </h2>

      <StepsComp
        heading={`Step ${index + 1}`}
        img={each.img}
        bg={bgURL}
        title={each.text}
        route={route}
        btnText={btnText}
        index={index}
      />
    </div>
  );
};

export default HowToParticipateStepsComp;
