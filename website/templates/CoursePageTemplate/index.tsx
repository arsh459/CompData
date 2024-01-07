import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Badge } from "@models/Prizes/PrizeV2";
import { UserInterface } from "@models/User/User";
import { useRouter } from "next/router";
import CoursePageMain from "./CoursePageMain";
import ButtonWithIconV2 from "@templates/LandingPage/V2/components/ButtonWithIconV2";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import { useState } from "react";
import {
  getButtonStatus,
  pinWorkout,
  startAndPinWorkout,
} from "@templates/CourseTemplate/changeCourseUtils";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import Link from "next/link";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { useChangePlan } from "./useChangePlan";
import ChangePlanModalComp from "./ChangePlanModalComp";

interface Props {
  badge: Badge;
  user: UserInterface;
}

const CoursePageTemplate: React.FC<Props> = ({ badge, user }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    noModal,
    section,
    onSetUnknown,
    onGoToSection,
    modalProps,
    setModalProps,
  } = useChangePlan();

  const { buttonText, action } = getButtonStatus("workout", badge?.id, user);
  const creator = useUserV2(
    badge?.creatorIds?.length ? badge.creatorIds[0].trim() : ""
  );

  const onNext = () => {
    setModalProps(undefined);
    onGoToSection("dateOfStartProgram");
  };

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
        // router.push("/myProgram");
        setLoading(false);
        onGoToSection("dateOfStartProgram");
      } else if (
        action === "START_PLAN_AND_PIN" ||
        action === "CHANGE_PLAN" ||
        action === "START_PLAN"
      ) {
        setModalProps({
          onNext,
          onClose: onSetUnknown,
          heading: "Are you sure you want to change your plan?",
          subtitle: "This plan will be added to your home screen",
        });
      }
    }
  };

  const onProceed = async () => {
    if (user.uid && badge?.id) {
      onSetUnknown();
      setLoading(true);
      await startAndPinWorkout(user.uid, badge.id);

      setTimeout(() => {
        router.push("/myProgram");
        setLoading(false);
      }, 200);
    }
  };

  const img =
    badge.badgeBGImage || user?.gender === "male"
      ? badge.bgImageMale
      : badge.bgImageFemale;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-[#946FFF] via-[#C556FF] to-[#FF53CF] flex flex-col relative z-0">
      <div
        onClick={handleBack}
        className="fixed top-0 left-0 right-0 max-w-screen-xl mx-auto px-4 py-8"
      >
        <ArrowLeftIcon className="w-8 aspect-1 text-white" />
      </div>

      <div className="h-[50vh] overflow-hidden">
        {img ? (
          <MediaTile
            media={img}
            alt="media"
            width={2400}
            height={getHeight(img, 2400)}
            thumbnail={img}
            objectString="object-cover object-center"
          />
        ) : null}
      </div>

      <div className="bg-black/50 flex-1 flex flex-col">
        <CoursePageMain badge={badge} user={creator?.user} />

        <div className="sticky bottom-0 w-full bg-black/30 flex justify-center items-center backdrop-blur">
          <div className="w-1/3 min-w-max max-w-lg grid grid-cols-2 gap-4 p-4">
            <Link href={`/program/${badge.slug}`}>
              <ButtonWithIconV2
                onClick={() => {}}
                btnText="View Workouts"
                textColor="#FFFFFF"
                bgColor="#FFFFFF00"
                btnStyle="px-6 py-3 w-full rounded-2xl font-nunitoM border border-white cursor-pointer"
              />
            </Link>
            <ButtonWithIconV2
              onClick={onClick}
              btnText={buttonText}
              textColor="#FFFFFF"
              bgColor="#6D55D1"
              btnStyle="px-6 py-3 rounded-2xl font-nunitoM cursor-pointer"
            />
          </div>
        </div>
      </div>

      <ChangePlanModalComp
        section={section}
        modalProps={modalProps}
        setModalProps={setModalProps}
        badge={badge}
        user={user}
        loading={loading}
        setLoading={setLoading}
        onSetUnknown={onSetUnknown}
        onGoToSection={onGoToSection}
        onProceed={onProceed}
        noModal={noModal}
      />
    </div>
  );
};

export default CoursePageTemplate;
