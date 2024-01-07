import clsx from "clsx";
import HowItWorksComp from "./HowItWorksComp";
import { HowWorksDataInterface } from "./utils";

interface Props {
  each: HowWorksDataInterface;
  index: number;
  route: string;
  btnText: string;
}

const HowItWorksV2: React.FC<Props> = ({ each, index, route, btnText }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-5/6 h-screen sm:h-max mx-auto px-4 flex flex-col">
      <div className="h-20 sm:h-40" />
      <h2
        aria-hidden={index !== 0}
        className={clsx(
          "font-popR text-center text-3xl sm:text-4xl lg:text-5xl text-transparent",
          "bg-clip-text bg-gradient-to-br from-[#FBE5FB] to-[#FFF6FF]",
          index === 0 ? "block opacity-100" : "sm:hidden opacity-0",
          "w-full px-4 sm:mb-8 lg:mb-16"
        )}
      >
        How it <span className="font-popSB">Works?</span>
      </h2>

      <HowItWorksComp
        heading={`Step ${index + 1}`}
        img={each.media}
        title={each.title}
        route={route}
        btnText={btnText}
      />
    </div>
  );
};

export default HowItWorksV2;
