// import WhatsAppChat from "@components/WhatsAppChat";
import { womenGroupImg } from "@constants/icons/iconURLs";
import FooterV3 from "@modules/footer/FooterV3";
import { useRef } from "react";
import LandingHeader from "@templates/WomenTemplate/components/V2/LandingHeader";
import FundingFrom from "@templates/LandingPage/V2/LandingTransformation/components/FundingFrom";
import { fundingFrom } from "@templates/WomenTemplate/utils";
import JoinRevolutionV2 from "@templates/WomenTemplate/components/V2/JoinRevolutionV2";
import Hero from "./Hero";
import StickyBackground from "./StickyBackground";
import { Background } from "@templates/WomenTemplate/components/Background";
import CourseBy from "./CourseBy";
import Highlights from "./Highlights";
import Stickybottom from "./Stickybottom";
import Reviews from "./Reviews";
import YouExpect from "./YouExpect";
// import YouGet from "./YouGet";

import { Badge, CourseReview } from "@models/Prizes/PrizeV2";
import { UserInterface } from "@models/User/User";
import { FAQDATA } from "@templates/joinBoatTemplate/utils";
import { Task } from "@models/Tasks/Task";
import OurFAQ from "./OurFAQ";
import Regime from "./Regime";
import Steps from "@templates/WomenTemplate/components/V2/Steps";
import DietAndWorkout from "@templates/WomenTemplate/components/V2/DietAndWorkout";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";

interface Props {
  badge: Badge;
  otherAuthors?: UserInterface[];
  primaryCoach?: UserInterface;
  badgeReview?: CourseReview[];
  courseFAQ?: FAQDATA[];
  dayZeroTasks?: Task[];
}

const CourseTemplate: React.FC<Props> = ({
  badge,
  otherAuthors,
  primaryCoach,
  badgeReview,
  courseFAQ,
  dayZeroTasks,
}) => {
  const { utm_source } = useCoachAtt();

  const parentRef = useRef<HTMLDivElement>(null);
  const route = `/start?origin=course&coach=${
    primaryCoach?.uid
  }&utm_source=${utm_source}&planType=${
    badge.planType ? badge.planType : "pro"
  }`;
  const coachRef = `coach=${primaryCoach?.uid}&utm_source=${utm_source}`;

  return (
    <div
      ref={parentRef}
      className="bg-[#100F1A] text-white w-screen min-h-screen scrollbar-hide relative z-0"
    >
      <Background imgUrl="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/Rectangle_2192_1N9_WKdCM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674822458738" />

      <LandingHeader route={route} btnText="Enroll Now" coachRef={coachRef} />

      <Hero badge={badge} route={route} ctaText="Enroll Now" />

      <div>
        <StickyBackground primaryCoach={primaryCoach}>
          <div className="bg-black/10 backdrop-blur-3xl">
            <DietAndWorkout
              dietAndWorkout={primaryCoach?.landingContent?.dietAndWorkout}
            />
            <Steps howItWorks={primaryCoach?.landingContent?.howItWorks} />
            <YouExpect youExpect={badge.youExpect} />
            {dayZeroTasks && dayZeroTasks.length ? (
              <Highlights dayZeroTasks={dayZeroTasks} />
            ) : null}
            {/* <YouGet /> */}
            {/* <CourseBadge badge={badge} /> */}
          </div>

          <CourseBy primaryCoach={primaryCoach} />
        </StickyBackground>

        <Regime otherAuthors={otherAuthors} />
        <Reviews badgeReview={badgeReview} />
        <FundingFrom data={fundingFrom} />
        <OurFAQ courseFAQ={courseFAQ} />
        <JoinRevolutionV2 origin="women" />
        <div className="w-32 aspect-1" />

        <Stickybottom
          coachRef={coachRef}
          badge={badge}
          route={route}
          btnText="Enroll Now"
        />
      </div>

      <div className="bg-[#FFFFFF1A] border-t border-white/30">
        <FooterV3 footerImg={womenGroupImg} />
      </div>

      {/* <WhatsAppChat
        redirectLink="https://api.whatsapp.com/send?phone=919958730020&text=Hi! I have a question"
        position="right-5 bottom-20"
      /> */}
    </div>
  );
};

export default CourseTemplate;
