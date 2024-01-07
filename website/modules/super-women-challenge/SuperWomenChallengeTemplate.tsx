import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import LandingHeaderV2 from "@templates/WomenTemplate/components/V3/LandingHeaderV2";
import { useRef } from "react";
import HeroV4 from "./HeroV4";
import HowToParticipateSteps from "./HowToParticipateSteps";
import ChallengeComp from "./ChallengeComp";
import BenifitsAndRewards from "./BenifitsAndRewards";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";
import JoinTheArmy from "./JoinTheArmy";
import { RoundInterface } from "@models/Event/Round";
import { womenGroupImg } from "@constants/icons/iconURLs";
import FooterV3 from "@modules/footer/FooterV3";
import OverlayButton from "./OverlayButton";

interface Props {
  round?: RoundInterface;
  numUsers?: number;
}

const SuperWomenChallengeTemplate: React.FC<Props> = ({ round, numUsers }) => {
  // const origin = "main";
  const parentRef = useRef<HTMLDivElement>(null);
  const { coachRef, utm_source } = useCoachAtt();

  // const onboardingPath = `/start?origin=${origin}${
  // coachRef ? `&${coachRef}` : ""
  // }`;
  // const { user, authStatus } = useAuth();
  const route = `/start?challenge=true&utm_source=${utm_source}`;
  // authStatus === "SUCCESS" && user?.onboarded && user?.badgeId
  //   ? "/myProgram"
  //   : onboardingPath;
  const mainCTAText = "Start Challenge"; //route === "/myProgram" ? "My Program" : "Start Journey";
  const howItWorksText = "Start Challenge";
  // route === "/myProgram" ? "Download App" : "Start Journey";
  const howItWorksURL = route;
  // route === "/myProgram"
  // ? "https://socialboat.app.link/download"
  // : onboardingPath;

  return (
    <div
      ref={parentRef}
      className="bg-[#100F1A] text-white w-[100%] min-h-screen relative z-0 scrollbar-hide"
      onScroll={(e) => console.log(e)}
    >
      {/* Absolutely Positioned full height , full width */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #16004F 0%, #300F86 51.53%, #6C26B7 100%)",
        }}
      />
      {/* Absolutely Positioned full Width h-13 */}
      <LandingHeaderV2
        route={route}
        btnText="Start Challenge"
        coachRef={coachRef}
      />

      {/* Placed Inside a container with mx-auto */}
      <HeroV4 route={route} btnText={mainCTAText} round={round} />
      <ChallengeComp
        description={round?.description}
        challengeImg={round?.challengeImg}
      />

      <OverlayButton route={route} numUsers={numUsers} title={round?.name} />
      <HowToParticipateSteps
        route={howItWorksURL}
        btnText={howItWorksText}
        steps={round?.steps}
      />
      <BenifitsAndRewards benifits={round?.benefits} />
      <FrequentlyAskedQuestions />
      <JoinTheArmy />
      <div className="bg-[#FFFFFF1A] border-t border-white/30">
        <FooterV3 footerImg={womenGroupImg} />
      </div>
    </div>
  );
};

export default SuperWomenChallengeTemplate;
