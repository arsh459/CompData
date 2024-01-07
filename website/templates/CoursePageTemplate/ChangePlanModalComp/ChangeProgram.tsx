import MediaCard from "@components/MediaCard";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useHomeBadgesV2 } from "@hooks/badges/useHomeBadgesV2";
import { UserInterface } from "@models/User/User";
import { getGradient } from "@modules/ExploreAll/utils";
import {
  getButtonStatus,
  startAndPinWorkout,
} from "@templates/CourseTemplate/changeCourseUtils";
import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import { sectionTypes } from "../useChangePlan";
import { ConfirmationProps } from "./Confirmation";
import Loading from "@components/loading/Loading";
import clsx from "clsx";

interface Props {
  user: UserInterface;
  onSetUnknown: () => void;
  setModalProps: (val: ConfirmationProps | undefined) => void;
  onGoToSection: (sec: sectionTypes) => void;
  setLoading: (val: boolean) => void;
}

const ChangeProgram: React.FC<Props> = ({
  user,
  onSetUnknown,
  setModalProps,
  onGoToSection,
  setLoading,
}) => {
  const { badges, fetched } = useHomeBadgesV2(TEAM_ALPHABET_GAME);

  const onNext = () => {
    setModalProps(undefined);
    onGoToSection("dateOfStartProgram");
  };

  const onClick = async (badgeId: string) => {
    const { action } = getButtonStatus("workout", badgeId, user);

    if (badgeId && user.uid) {
      if (action === "GO_TO_PLAN") {
        onSetUnknown();
      } else if (!user?.recommendationConfig?.start) {
        setLoading(true);
        await startAndPinWorkout(user.uid, badgeId);
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

  return (
    <div className="w-full h-[80vh] flex flex-col justify-between items-end">
      <CloseBtn onCloseModal={onSetUnknown} color="#000000" />
      <div className="w-full flex-1 bg-black/30 border backdrop-blur-3xl overflow-y-scroll scrollbar-hide rounded-2xl border-white/20 p-4 grid grid-cols-2 gap-4 items-center justify-center mt-4 relative">
        {fetched ? (
          <>
            {badges?.map((each) => (
              <button
                key={each.id}
                onClick={() => onClick(each.id)}
                className="rounded-2xl group"
                style={{
                  backgroundImage: getGradient(
                    each.bgLinearColors2 || each.bgLinearColors
                  ),
                }}
              >
                <div className="w-full aspect-[328/265] overflow-hidden rounded-2xl relative z-0 group-hover:scale-[98%]">
                  <MediaCard
                    media={
                      each.id === "d3b54de8-ac46-431c-b174-ab3351729413"
                        ? each.bgImageMale
                        : each.bgImageFemale
                    }
                    HWClassStr="w-full h-full"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 top-[60%] rounded-2xl"
                    style={{
                      background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)`,
                    }}
                  />
                  <div className="px-4 py-4 absolute bottom-0 left-0 right-0 z-10">
                    <h3 className={clsx("text-white/90 text-sm font-popM")}>
                      {each.name}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </>
        ) : (
          <div className="absolute inset-0 flex justify-center items-center">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeProgram;
