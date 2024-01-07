import { headerTypes } from "@modules/Header";
import BadgesContainer from "./BadgesContainer";
import EventBriefLocked from "./EventBriefLocked";
import HowToPlay from "./HowToPlay";
import LockedProgramWrapper from "./LockedProgramWrapper";
import Testimonials from "./Testimonials";

interface Props {
  setIsTrasparent?: (val: headerTypes) => void;
}

const LockedProgram: React.FC<Props> = ({ setIsTrasparent }) => {
  return (
    <LockedProgramWrapper setIsTrasparent={setIsTrasparent}>
      <EventBriefLocked />
      <BadgesContainer />
      <Testimonials />
      <HowToPlay
        heading="How it works?"
        imgUrl={`https://ik.imagekit.io/socialboat/Component_2_Suwt1o4R7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657014696054`}
        title="Step 1. Follow the program"
        description="When you signup you get a program especially designed to achieve the goal. Just follow the program each day"
        textColor="text-white"
      />
      <HowToPlay
        imgUrl={`https://ik.imagekit.io/socialboat/Component_1__1__NuKHW56Gg.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657209655373`}
        title="Step 2. Earn FitPoints"
        description="Each task in the program gets you FitPoints. This creates the leaderboard ranking"
        textColor="text-white"
      />
      <HowToPlay
        imgUrl={`https://ik.imagekit.io/socialboat/Component_1__2__P-F3xwIVZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657209655295`}
        title="Step 3. Unlock Rewards"
        description="Top athletes on the leaderboard win rewards. This is in addition to your fitness."
        textColor="text-white"
      />
    </LockedProgramWrapper>
  );
};

export default LockedProgram;
