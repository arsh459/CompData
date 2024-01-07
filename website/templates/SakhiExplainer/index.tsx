import Section1 from "./Section1";
import Section2 from "./Section2";
import SwipeDown from "./SwipeDown";
import { Section3Item } from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import { useEffect, useRef, useState } from "react";
import LandingHeaderV2 from "@templates/WomenTemplate/components/V3/LandingHeaderV2";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import { useScroll } from "framer-motion";
import { section3Data } from "./uttils/constants";
import SliderComp from "./SliderComp";

const SakhiExplainer = () => {
  const container = useRef<HTMLDivElement>(null);
  const section3 = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container });
  const { scrollYProgress: section3ScrollYProgress } = useScroll({
    container,
    target: section3,
  });
  const [endReached, setEndReached] = useState<boolean>(false);
  const [currIndex, setCurrIndex] = useState<number>(0);

  useEffect(() => {
    scrollYProgress.on("change", (val) => setEndReached(val >= 0.9));
  }, [scrollYProgress]);

  const { coachRef } = useCoachAtt();

  return (
    <div
      ref={container}
      className="w-screen h-screen relative z-0 bg-[#2B1862] flex flex-col overflow-y-scroll overflow-x-hidden snap-y snap-mandatory"
    >
      <div className="fixed left-0 right-0 top-0 bottom-0 -z-10 bg-gradient-to-tr from-[#9B4DFF] via-[#2B1862] to-[#2B1862]" />
      <LandingHeaderV2
        route={`/start?origin=$women${coachRef ? `&${coachRef}` : ""}`}
        btnText="Start Journey"
        coachRef={coachRef}
      />

      <div className="flex-1 w-full max-w-screen-xl mx-auto">
        <Section1 />
        <Section2 />

        <div ref={section3} className="relative z-0">
          <div className="sticky top-0 z-10 left-0 righ-0 lg:hidden pt-12">
            <SliderComp
              currIndex={currIndex}
              scrollYProgress={scrollYProgress}
              half={true}
            />
          </div>

          {section3Data.map((each, index) => (
            <Section3Item
              key={each.phase}
              {...each}
              currIndex={currIndex}
              setCurrIndex={() => setCurrIndex(index)}
              scrollYProgress={section3ScrollYProgress}
            />
          ))}
        </div>

        <Section4 />
        <Section5 />
      </div>

      {endReached ? null : (
        <div className="fixed left-0 right-0 bottom-4 md:bottom-8">
          <SwipeDown />
        </div>
      )}
    </div>
  );
};

export default SakhiExplainer;
