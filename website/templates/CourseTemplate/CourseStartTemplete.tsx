import { womenGroupImg } from "@constants/icons/iconURLs";
import FooterV3 from "@modules/footer/FooterV3";
import { useRef, useState } from "react";
import Hero from "./Hero";
import StickyBackground from "./StickyBackground";
import { Background } from "@templates/WomenTemplate/components/Background";
import CourseBy from "./CourseBy";
import Highlights from "./Highlights";
import Stickybottom from "./Stickybottom";
import Reviews from "./Reviews";
import YouExpect from "./YouExpect";
import { Badge, CourseReview } from "@models/Prizes/PrizeV2";
import { UserInterface } from "@models/User/User";
import { FAQDATA } from "@templates/joinBoatTemplate/utils";
import { Task } from "@models/Tasks/Task";
import OurFAQ from "./OurFAQ";
import DietAndWorkout from "@templates/WomenTemplate/components/V2/DietAndWorkout";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import { useRouter } from "next/router";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import {
  getButtonStatus,
  pinWorkout,
  startAndPinWorkout,
} from "./changeCourseUtils";
import WarningModal from "@components/WarningModal";
import LoadingModal from "@components/loading/LoadingModal";

interface Props {
  badge: Badge;
  user: UserInterface;
  otherAuthors?: UserInterface[];
  primaryCoach?: UserInterface;
  badgeReview?: CourseReview[];
  courseFAQ?: FAQDATA[];
  dayZeroTasks?: Task[];
}

const CourseStartTemplate: React.FC<Props> = ({
  badge,
  otherAuthors,
  user,
  primaryCoach,
  badgeReview,
  courseFAQ,
  dayZeroTasks,
}) => {
  const { utm_source } = useCoachAtt();

  const parentRef = useRef<HTMLDivElement>(null);
  const route = `/start?origin=course&coach=${primaryCoach?.uid}&utm_source=${utm_source}`;
  const coachRef = `coach=${primaryCoach?.uid}&utm_source=${utm_source}`;

  const [modalText, setModalText] = useState<string>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { buttonText, action } = getButtonStatus("workout", badge?.id, user);

  // console.log("action", action, user.recommendationConfig?.start);

  const onClick = async () => {
    weEventTrack("course_startPlan", {});

    if (badge?.id && user.uid) {
      if (action === "GO_TO_PLAN") {
        setLoading(true);
        pinWorkout(user?.uid, badge.id);
        router.push(`/myProgram/${badge.id}`);
        setLoading(false);
      } else if (!user?.recommendationConfig?.start) {
        setLoading(true);
        await startAndPinWorkout(user.uid, badge.id);
        router.push("/myProgram");
        setLoading(false);
      } else if (
        action === "START_PLAN_AND_PIN" ||
        action === "CHANGE_PLAN" ||
        action === "START_PLAN"
      ) {
        setModalText("Are you sure you want to change your plan?");
      }
    }
  };

  const onProceed = async () => {
    if (user.uid && badge?.id) {
      setLoading(true);
      await startAndPinWorkout(user.uid, badge.id);

      setTimeout(() => {
        router.push("/myProgram");
        setLoading(false);
        setModalText("");
      }, 200);
    }
  };

  return (
    <div
      ref={parentRef}
      className="bg-[#100F1A] text-white w-screen min-h-screen scrollbar-hide relative z-0"
    >
      <Background imgUrl="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/Rectangle_2192_1N9_WKdCM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674822458738" />

      <Hero
        badge={badge}
        route={route}
        ctaText={buttonText}
        ctaCallBack={onClick}
      />

      <div>
        <StickyBackground primaryCoach={primaryCoach}>
          <div className="bg-black/10 backdrop-blur-3xl">
            <DietAndWorkout
              dietAndWorkout={primaryCoach?.landingContent?.dietAndWorkout}
            />
            {/* <Steps howItWorks={primaryCoach?.landingContent?.howItWorks} /> */}
            <YouExpect youExpect={badge.youExpect} />
            {dayZeroTasks && dayZeroTasks.length ? (
              <Highlights dayZeroTasks={dayZeroTasks} />
            ) : null}
            {/* <YouGet /> */}
            {/* <CourseBadge badge={badge} /> */}
          </div>

          <CourseBy primaryCoach={primaryCoach} />
        </StickyBackground>

        {/* <Regime otherAuthors={otherAuthors} /> */}
        <Reviews badgeReview={badgeReview} />
        {/* <FundingFrom data={fundingFrom} /> */}
        <OurFAQ courseFAQ={courseFAQ} />
        {/* <JoinRevolutionV2 origin="women" /> */}
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

      {loading ? (
        <LoadingModal fill="#ff735c" height={75} width={75} fixed={true} />
      ) : null}

      {modalText ? (
        <WarningModal
          visible={modalText ? true : false}
          onClose={() => setModalText(undefined)}
          heading={modalText}
          subtitle="This plan will be added to your home screen"
          onNext={onProceed}
          loading={loading}
        />
      ) : null}
    </div>
  );
};

export default CourseStartTemplate;
